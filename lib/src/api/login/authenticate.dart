import '../../constants/api_functions_name.dart';
import '../../models/session.dart';
import '../../pronote/request_function_api.dart';

Future<Map<String, dynamic>> callApiLoginAuthenticate (Session session, {
  required String solvedChallenge,
}) async {
  final requestPayload = session.writeFunctionPayload({
    "donnees": {
      "connexion": 0,
      "challenge": solvedChallenge,
      "espace": session.metadata.accountType.id
    }
  });

  final responsePayload = await requestFunctionApi(session, requestPayload, ApiFunctionsName.authenticate);
  return session.readFunctionPayload(responsePayload);
}
