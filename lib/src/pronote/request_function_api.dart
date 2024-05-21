import 'dart:convert';

import 'package:http/http.dart' as http;

import '../constants/api_functions_name.dart';
import '../constants/user_agent.dart';
import '../models/function_payload.dart';
import '../models/session.dart';

Future<FunctionPayload> requestFunctionApi (Session session, FunctionPayload payload, ApiFunctionsName functionName) async {
  final endpoint = session.metadata.instanceRootUri.replace(
    path: "${session.metadata.instanceRootUri.path}/appelfonction/${session.metadata.accountType.id}/${session.metadata.sessionID}/${payload.encryptedOrder}"
  );
  
  final response = await http.post(endpoint,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': internalUserAgent
    },
    body: json.encode({
      "session": int.parse(session.metadata.sessionID),
      "numeroOrdre": payload.encryptedOrder,
      "nom": functionName.value,
      "donneesSec": payload.data
    })
  );

  final raw = response.body;
  final decoded = json.decode(raw);

  return FunctionPayload(
    encryptedOrder: decoded["numeroOrdre"],
    data: decoded["donneesSec"]
  );
}
