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
import 'models/clients/pronote_client.dart';
import 'models/clients/student_client.dart';
import 'models/session.dart';
import 'models/session_metadata.dart';
import 'pronote/login_portal_downloader.dart';
import 'pronote/login_portal_session_extractor.dart';
import 'utils/url.dart';

class Authenticator {
  /// Will authenticate and return a client instance.
  /// This instance will be automatically guessed based on the [accountType] value.
  static Future<PronoteClient> withDynamicCredentials(final ApiAccountType accountType, {
    required final String loginPortalUrl,
    required final String username,
    required final String password,
    required final String deviceUuid
  }) async {
    final authentication = await _authenticateCredentials(accountType,
      loginPortalUrl: loginPortalUrl,
      username: username,
      password: password,
      deviceUuid: deviceUuid
    );

    // Extract returned values from the process.
    final session = authentication["session"];
    final loginInformations = authentication["loginInformations"];
    final userData = authentication["userData"];

    // Build the next time authentication map.
    final Map<String, String> nextTimeAuthentication = {
      "username": username,
      "nextTimeToken": authentication["nextTimeToken"]
    };

    switch (accountType) {
      case ApiAccountType.student:
        return StudentClient(
          session,
          loginInformations: loginInformations,
          userData: userData,
          nextTimeAuthentication: nextTimeAuthentication,
        );
      default:
        throw Exception('Invalid account type');
    }
  }

  /// Will authenticate and return a student client instance.
  static Future<StudentClient> withStudentCredentials({
    required final String loginPortalUrl,
    required final String username,
    required final String password,
    required final String deviceUuid
  }) async {
    final c = await withDynamicCredentials(ApiAccountType.student,
      loginPortalUrl: loginPortalUrl,
      username: username,
      password: password,
      deviceUuid: deviceUuid
    );

    return c as StudentClient;
  }

  static Future<Session> _retrieveSessionFor (Uri instanceRootUri, ApiAccountType accountType) async {
    final loginPortalUri = instanceRootUri.replace(
      path: '${instanceRootUri.path}/${accountType.path}',
      // Add compatibility and ENT bypasses.
      query: 'fd=1&bydlg=A6ABB224-12DD-4E31-AD3E-8A39A1C2C335&login=true'
    );

    const pronoteCookies = <String>{'ielang=fr'};

    final loginPortalHtml = await loginPortalDownloader(loginPortalUri, pronoteCookies);
    return loginPortalSessionExtractor(loginPortalHtml, instanceRootUri);
  }

  static Future<Map<String, dynamic>> _retrieveLoginInformations (Session session) async {
    RSAPublicKey rsaPublicKey = RSAPublicKey(
      BigInt.parse(session.encryption.rsaModulus, radix: 16),
      BigInt.parse(session.encryption.rsaExponent, radix: 16)
    );

    // We generate the AES IV that will be sent to server
    // so it can assign our session to it.
    final aesIV = IV.fromSecureRandom(16);

    final rsa = Encrypter(RSA(publicKey: rsaPublicKey));
    String uuid;

    switch (session.metadata.version) {
      case PronoteVersion.vBefore2023:
        uuid = rsa.encryptBytes(aesIV.bytes).base64;
        break;
      case PronoteVersion.v2023:
        if (session.metadata.isHttp) {
          uuid = rsa.encryptBytes(aesIV.bytes).base64;
        }
        else {
          uuid = base64.encode(aesIV.bytes);
        }

        break;
    }

    return callApiLoginInformations(session,
      uuid: uuid,
      ivAfterInitialization: aesIV
    );
  }

  /// Authenticate the user with the given credentials.
  /// Returns a map containing the session, the user data and the login informations.
  /// The next time token is also returned.
  static Future<Map<String, dynamic>> _authenticateCredentials (final ApiAccountType accountType, {
    required final String loginPortalUrl,
    required final String username,
    required final String password,
    required final String deviceUuid
  }) async {
    final instanceRootUri = loginPortalUrlToInstanceRootUri(loginPortalUrl);
    if (instanceRootUri == null) throw Exception('Invalid Pronote URL');

    final session = await _retrieveSessionFor(instanceRootUri, accountType);
    final loginInformations = await _retrieveLoginInformations(session);

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
    
    return {
      "session": session,
      "userData": userData,
      "loginInformations": loginInformations,
      "nextTimeToken": loginAuthenticate["donnees"]["jetonConnexionAppliMobile"],
    };
  }

}

