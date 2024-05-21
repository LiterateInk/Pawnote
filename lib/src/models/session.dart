import '../constants/accounts.dart';
import 'function_payload.dart';
import 'session_encryption.dart';
import 'session_encryption_aes.dart';
import 'session_metadata.dart';

class Session {
  SessionMetadata metadata;
  SessionEncryption encryption;
  int order = 0;

  Session({
    required this.metadata,
    required this.encryption,
  });

  factory Session.fromJson(Map<String, dynamic> json, Uri instanceRootUri) {
    // Make sure the JSON is valid with the minimal required keys.
    if (json case {
      'h': String sessionID,
      'a': int accountTypeId,
    }) {
      final accountType = ApiAccountType.values.firstWhere((element) => element.id == accountTypeId);
      
      // Fallback to latest version defaults.
      String rsaModulus = defaultRsaModulus1024;
      String rsaExponent = defaultRsaExponent1024;
      PronoteVersion version = PronoteVersion.v2023;

      // Before the v2023 update, we would have those two parameters for RSA.
      if (json["ER"] is String && json["MR"] is String) {
        rsaExponent = json["ER"];
        rsaModulus = json["MR"];

        version = PronoteVersion.vBefore2023;
      }

      final metadata = SessionMetadata(
        instanceRootUri: instanceRootUri,
        sessionID: sessionID,
        accountType: accountType,
        skipCompression: json["sCoA"] ?? false,
        skipEncryption: json["sCrA"] ?? false,
        isDemo: json["d"] ?? false,
        isHttp: json["http"] ?? false,
        version: version,
      );

      final encryption = SessionEncryption(
        aes: SessionEncryptionAes(),
        rsaModulus: rsaModulus,
        rsaExponent: rsaExponent,
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

  FunctionPayload writeFunctionPayload (Map<String, dynamic> payload) {
    order++;

    String encryptedOrder = encryption.aes.encrypt(order.toString());
    // TODO: Compression and encryption.
    
    return FunctionPayload(encryptedOrder: encryptedOrder, data: payload);
  }

  Map<String, dynamic> readFunctionPayload (FunctionPayload payload) {
    order++;
    final decryptedOrder = encryption.aes.decrypt(payload.encryptedOrder);

    if (decryptedOrder != order.toString()) {
      throw Exception('Invalid order: $decryptedOrder');
    }

    if (payload.data is String) {
      // TODO: Decompression and decryption.
    }

    return payload.data;
  }

  void writeFileUploadPayload () {
    // TODO
  }
}