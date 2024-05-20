import 'package:encrypt/encrypt.dart';

import '../constants/accounts.dart';
import '../constants/rsa.dart';

import 'session_metadata.dart';
import 'session_encryption.dart';

class Session {
  SessionMetadata metadata;
  SessionEncryption encryption;
  int order = 0;

  Session({
    required this.metadata,
    required this.encryption,
  });

  factory Session.fromJson(Map<String, dynamic> json) {
    // Make sure the JSON is valid with the minimal required keys.
    if (json case {
      'h': String sessionID,
      'a': int accountTypeId,
    }) {
      final accountType = ApiAccountType.values.firstWhere((element) => element.id == accountTypeId);
      
      // Fallback to latest version defaults.
      String rsaExponent = defaultRsaModulo1024;
      String rsaModulus = defaultRsaExponent1024;
      PronoteVersion version = PronoteVersion.v2023;

      // Before the v2023 update, we would have those two parameters for RSA.
      if (json["ER"] is String && json["MR"] is String) {
        rsaExponent = json["ER"];
        rsaModulus = json["MR"];

        version = PronoteVersion.vBefore2023;
      }

      IV? aesIv;

      // We have to setup IV for our session when we're not in `common`.
      if (accountType != ApiAccountType.common) {
        aesIv = IV.fromSecureRandom(16);
      }

      final metadata = SessionMetadata(
        sessionID: sessionID,
        accountType: accountType,
        skipCompression: json["sCoA"] ?? false,
        skipEncryption: json["sCrA"] ?? false,
        isDemo: json["d"] ?? false,
        isHttp: json["http"] ?? false,
        version: version,
      );

      final encryption = SessionEncryption(
        rsaExponent: rsaExponent,
        rsaModulus: rsaModulus,
        aesIv: aesIv,
      );

      return Session(
        metadata: metadata,
        encryption: encryption,
      );
    }
    else {
      throw FormatException('Invalid JSON: $json');
    }
  }
}