import 'dart:convert';

/// Convert relaxed JSON to JSON
/// 
/// Should be enough to convert the relaxed JSON
/// given by PRONOTE on the login portal to a valid JSON.
Map<String, dynamic> relaxedJsonToJson (String relaxed) {
  final expression = RegExp('([\'"])?([a-z0-9A-Z_]+)([\'"])?:');
  
  final valid = relaxed.replaceAllMapped(expression, (match) {
    return '"${match.group(2)}":';
  }).replaceAll("'", '"');

  return json.decode(valid);
}
