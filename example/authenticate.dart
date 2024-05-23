import 'package:pawnote/pawnote.dart';

void main() async {
  final client = await Authenticator.withStudentCredentials(
    loginPortalUrl: 'https://demo.index-education.net/pronote',
    username: 'demonstration',
    password: 'pronotevs',
    deviceUuid: 'my-device-uuid'
  );

  print("Authenticated as '${client.username}' on instance '${client.instanceRootUri}' with token '${client.nextTimeToken}'.");
}
