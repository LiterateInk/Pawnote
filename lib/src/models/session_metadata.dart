import '../constants/accounts.dart';

enum PronoteVersion {
  vBefore2023,
  v2023,
}

/// A low-level representation of a Pronote session.
/// Contains partially extracted data from the login portal.
class SessionMetadata {
  final Uri instanceRootUri;
  final String sessionID;
  final ApiAccountType accountType;
  final bool skipCompression;
  final bool skipEncryption;
  final bool isDemo;
  final bool isHttp;
  final PronoteVersion version;

  SessionMetadata({
    required this.instanceRootUri,
    required this.sessionID,
    required this.accountType,
    required this.skipCompression,
    required this.skipEncryption,
    required this.isDemo,
    required this.isHttp,
    required this.version,
  });
}
