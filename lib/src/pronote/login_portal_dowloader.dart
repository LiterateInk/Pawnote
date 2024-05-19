import 'package:http/http.dart' as http;
import '../constants/user_agent.dart';

void loginPortalDownloader (Uri uri, Set<String> cookies) async {
  final loginPortalHtml = await http.read(uri,
    headers: {
      'Cookie': cookies.join('; '),
      'User-Agent': internalUserAgent
    }
  );

  // TODO: Manual redirect ???
  print(loginPortalHtml);
}
