import 'package:pawnote/pawnote.dart' as pronote;

void main() async {
  pronote.authenticateWithCredentials(
    loginPortalUrl: 'https://demo.index-education.net/pronote',
    accountType: pronote.ApiAccountType.student,
    username: 'demonstration',
    password: 'pronotevs',
    deviceUuid: 'my-device-uuid'
  );
}
