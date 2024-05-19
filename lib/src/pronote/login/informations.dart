import 'package:http/http.dart' as http;
import '../../constants/accounts.dart';

void callApiLoginInformations (Uri pronoteUri, ApiAccountType accountType, Set<String> pronoteCookies) async {
  final httpPackageInfo = await http.read(pronoteUri);
  print(httpPackageInfo); // TODO
}