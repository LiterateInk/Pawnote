import '../models/session.dart';
import '../utils/relaxed_json_to_json.dart';

Session loginPortalSessionExtractor (String body) {
  // 1. Remove all spaces and line breaks.
  body = body.replaceAll(RegExp(r'\s'), '');

  // Define the start and end of the relaxed JSON position.
  const from = "Start(";
  const to = ")}catch";

  // 2. Extract the relaxed JSON of the session.
  final relaxed = body.substring(
    body.indexOf(from) + from.length,
    body.indexOf(to)
  );

  // 3. Convert the relaxed JSON to a valid JSON.
  final json = relaxedJsonToJson(relaxed);

  // 4. Give the extracted session.
  return Session.fromJson(json);
}
