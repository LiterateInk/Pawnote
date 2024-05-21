class FunctionPayload {
  /// Order of the request (incremented by 1 each time).
  /// Encrypted with the AES key and encoded in base16.
  final String encryptedOrder;

  /// Can be a JSON (Map), a compressed JSON (String),
  /// an encrypted JSON (String) or even a compressed AND encrypted JSON (String).
  final dynamic data;

  FunctionPayload({
    required this.encryptedOrder,
    required this.data,
  });
}