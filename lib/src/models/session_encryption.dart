import 'package:encrypt/encrypt.dart';

class SessionEncryption {
  IV? aesIv;
  Key? aesKey;

  String rsaExponent;
  String rsaModulus;

  SessionEncryption({
    required this.rsaExponent,
    required this.rsaModulus,
    this.aesIv,
    this.aesKey,
  });
}