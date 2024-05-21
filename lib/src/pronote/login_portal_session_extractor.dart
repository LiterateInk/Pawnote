import '../models/session.dart';
import '../utils/relaxed_json_to_json.dart';

Session loginPortalSessionExtractor (String loginPortalHtml, Uri instanceRootUri) {
  // 1. Remove all spaces and line breaks.
  loginPortalHtml = loginPortalHtml.replaceAll(RegExp(r'\s'), '');

  // Define the start and end of the relaxed JSON position.
  const from = "Start(";
  const to = ")}catch";

  // 2. Extract the relaxed JSON of the session.
  final relaxed = loginPortalHtml.substring(
    loginPortalHtml.indexOf(from) + from.length,
    loginPortalHtml.indexOf(to)
  );

  // 3. Convert the relaxed JSON to a valid JSON.
  final json = relaxedJsonToJson(relaxed);

  // 4. Give the extracted session.
  return Session.fromJson(json, instanceRootUri);
}
