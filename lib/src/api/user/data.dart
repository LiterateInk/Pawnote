import '../../constants/api_functions_name.dart';
import '../../models/session.dart';
import '../../pronote/request_function_api.dart';

Future<Map<String, dynamic>> callApiUserData (Session session) async {
  final requestPayload = session.writeFunctionPayload({});
  final responsePayload = await requestFunctionApi(session, requestPayload, ApiFunctionsName.userData);
  return session.readFunctionPayload(responsePayload);
}
