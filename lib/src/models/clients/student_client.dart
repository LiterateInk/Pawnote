import 'pronote_client.dart';

class StudentClient extends PronoteClient {
  StudentClient(super.session, {
    required super.loginInformations,
    required super.userData,
    required super.nextTimeAuthentication
  });

  Uri get instanceRootUri => session.metadata.instanceRootUri;
}