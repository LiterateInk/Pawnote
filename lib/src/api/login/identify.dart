import '../../constants/api_functions_name.dart';
import '../../models/session.dart';
import '../../pronote/request_function_api.dart';

Future<Map<String, dynamic>> callApiLoginIdentify (Session session, {
  required String username,
  required String deviceUuid,

  /// Whether we use ENT or not.
  /// Note that this is relevant only for first-time authentications.
  required bool isEnt,

  /// When it's the first-time authentication.
  required bool requestFirstMobileAuthentication,
  /// When we authenticate using a token.
  required bool reuseMobileAuthentication,
  /// When we authenticate using a QRCode.
  required bool requestFromQRCode,
}) async {
  final requestPayload = session.writeFunctionPayload({
    "donnees": {
      "genreConnexion": 0,
      "genreEspace": session.metadata.accountType.id,
      "identifiant": username,
      "pourENT": isEnt,
      "enConnexionAuto": false,
      "enConnexionAppliMobile": reuseMobileAuthentication,
      "demandeConnexionAuto": false,
      "demandeConnexionAppliMobile": requestFirstMobileAuthentication,
      "demandeConnexionAppliMobileJeton": requestFromQRCode,
      "uuidAppliMobile": deviceUuid,
      "loginTokenSAV": ""
    }
  });

  final responsePayload = await requestFunctionApi(session, requestPayload, ApiFunctionsName.identify);
  return session.readFunctionPayload(responsePayload);
}
