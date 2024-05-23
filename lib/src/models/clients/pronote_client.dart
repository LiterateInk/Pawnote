import '../session.dart';

class PronoteClient {
  final Session session;
  final Map<String, dynamic> loginInformations;
  final Map<String, dynamic> userData;
  
  late String username;
  late final String nextTimeToken;

  PronoteClient(this.session, {
    required this.loginInformations,
    required this.userData,
    required Map<String, String> nextTimeAuthentication,
  }) {
    username = nextTimeAuthentication["username"]!;
    nextTimeToken = nextTimeAuthentication["nextTimeToken"]!;
  }
}
