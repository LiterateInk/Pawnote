package ink.literate.pawnote.models.errors

class BadCredentialsError: Exception("Unable to resolve the challenge, make sure the credentials or token are corrects")
class AuthenticateError(message: String): Exception(message)
class AccessDeniedError: Exception("You do not have access to this area or your authorizations are insufficient")