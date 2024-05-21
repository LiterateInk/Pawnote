import 'dart:convert';

import 'package:encrypt/encrypt.dart';
import 'package:pointycastle/export.dart';

import 'api/login/informations.dart';
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

  callApiLoginInformations(session,
    uuid: rsaUuid,
    ivAfterInitialization: aesIV
  );
}
