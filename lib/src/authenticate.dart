import 'dart:convert';
import 'package:convert/convert.dart';

import 'package:crypto/crypto.dart';
import 'package:encrypt/encrypt.dart';
import 'package:pointycastle/export.dart';

import 'api/login/authenticate.dart';
import 'api/login/identify.dart';
import 'api/login/informations.dart';
import 'api/user/data.dart';
import 'constants/accounts.dart';
import 'models/session_metadata.dart';
import 'pronote/login_portal_dowloader.dart';
import 'pronote/login_portal_session_extractor.dart';
import 'utils/url.dart';

void authenticateWithCredentials({
  required final String loginPortalUrl,
  required final ApiAccountType accountType,
  required final String username,
  required final String password,
  required final String deviceUuid
}) async {
  final instanceRootUri = loginPortalUrlToInstanceRootUri(loginPortalUrl);

  if (instanceRootUri == null) {
    throw Exception('Invalid Pronote URL');
  } 

  final loginPortalUri = instanceRootUri.replace(
    path: '${instanceRootUri.path}/${accountType.path}',
    // Add compatibility and ENT bypasses.
    query: 'fd=1&bydlg=A6ABB224-12DD-4E31-AD3E-8A39A1C2C335&login=true'
  );

  const pronoteCookies = <String>{'ielang=fr'};

  final loginPortalHtml = await loginPortalDownloader(loginPortalUri, pronoteCookies);
  final session = loginPortalSessionExtractor(loginPortalHtml, instanceRootUri);

  RSAPublicKey rsaPublicKey = RSAPublicKey(
    BigInt.parse(session.encryption.rsaModulus, radix: 16),
    BigInt.parse(session.encryption.rsaExponent, radix: 16)
  );

  final aesIV = IV.fromSecureRandom(16);

  final rsaCipher = Encrypter(RSA(publicKey: rsaPublicKey));
  String rsaUuid;

  switch (session.metadata.version) {
    case PronoteVersion.vBefore2023:
      rsaUuid = rsaCipher.encryptBytes(aesIV.bytes).base64;
      break;
    case PronoteVersion.v2023:
      if (session.metadata.isHttp) {
        rsaUuid = rsaCipher.encryptBytes(aesIV.bytes).base64;
      }
      else {
        rsaUuid = base64.encode(aesIV.bytes);
      }
      break;
  }

  final loginInformations = await callApiLoginInformations(session,
    uuid: rsaUuid,
    ivAfterInitialization: aesIV
  );

  final loginIdentify = await callApiLoginIdentify(session,
    username: username,
    deviceUuid: deviceUuid,
    isEnt: false,
    requestFirstMobileAuthentication: true,
    reuseMobileAuthentication: false,
    requestFromQRCode: false
  );

  var compatibilityUsername = username;
  if (loginIdentify["donnees"]["modeCompLog"] == 1) {
    compatibilityUsername = username.toLowerCase();
  }

  var compatibilityPassword = password;
  if (loginIdentify["donnees"]["modeCompMdp"] == 1) {
    compatibilityPassword = password.toLowerCase();
  }

  var challengeAesKeyDecoded = "";
  if (loginIdentify["donnees"]["alea"] is String) {
    challengeAesKeyDecoded += loginIdentify["donnees"]["alea"];
  }
  
  challengeAesKeyDecoded += compatibilityPassword;
  var challengeAesKeyHash = hex.encode(sha256.convert(utf8.encode(challengeAesKeyDecoded)).bytes);
  challengeAesKeyHash = compatibilityUsername + challengeAesKeyHash.toString().toUpperCase();

  final challengeAesKey = hex.encode(utf8.encode(challengeAesKeyHash));

  // Decrypt the challenge using the AES key generated.
  final challengeDecrypted = session.encryption.aes.decrypt(loginIdentify["donnees"]["challenge"],
    key: challengeAesKey
  );

  final challengeDecryptedUnscrambledParts = List<int>.empty(growable: true);
  for (var i = 0; i < challengeDecrypted.length; i += 1) {
    if (i % 2 == 0) {
      challengeDecryptedUnscrambledParts.add(challengeDecrypted.codeUnitAt(i));
    }
  }
  
  final challengeDecryptedUnscrambled = String.fromCharCodes(challengeDecryptedUnscrambledParts);

  final resolvedChallenge = session.encryption.aes.encrypt(challengeDecryptedUnscrambled,
    key: challengeAesKey
  );

  final loginAuthenticate = await callApiLoginAuthenticate(session,
    solvedChallenge: resolvedChallenge
  );

  if (loginAuthenticate["donnees"]["jetonConnexionAppliMobile"] is! String) {
    throw Exception('Token was not given during authentication.');
  }

  // Decrypt the new AES key.
  final decryptedAuthKey = session.encryption.aes.decrypt(loginAuthenticate["donnees"]["cle"],
    key: challengeAesKey
  );

  final authKeyBytesArray = decryptedAuthKey.split(',').map((e) => int.parse(e)).toList();
  final authKey = hex.encode(authKeyBytesArray);
  session.encryption.aes.key = authKey;

  final userData = await callApiUserData(session);
  // TODO: Handle user data in a new class.
}
