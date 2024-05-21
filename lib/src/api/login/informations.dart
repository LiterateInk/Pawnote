import 'package:encrypt/encrypt.dart';

import '../../constants/api_functions_name.dart';
import '../../models/session.dart';
import '../../pronote/request_function_api.dart';

Future<Map<String, dynamic>> callApiLoginInformations (Session session, {
  required String uuid,
  required IV ivAfterInitialization
}) async {
  final requestPayload = session.writeFunctionPayload({
    "donnees": {
      "identifiantNav": null,
      "Uuid": uuid
    }
  });

  final responsePayload = await requestFunctionApi(session, requestPayload, ApiFunctionsName.informations);
  session.encryption.aes.iv = ivAfterInitialization;
  
  return session.readFunctionPayload(responsePayload);
}
