import 'package:http/http.dart' as http;
import '../constants/user_agent.dart';

Future<String> loginPortalDownloader (Uri uri, Set<String> cookies) async {
  final client = http.Client();

  final request = http.Request("GET", uri)
    ..followRedirects = false
    ..headers.addAll({
      'Cookie': cookies.join('; '),
      'User-Agent': internalUserAgent
    });

  try {
    final loginPortalResponse = await client.send(request);
    return loginPortalResponse.stream.bytesToString();
  }
  finally {
    client.close();
  }
}
