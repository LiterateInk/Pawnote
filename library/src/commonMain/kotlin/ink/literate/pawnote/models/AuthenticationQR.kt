package ink.literate.pawnote.models

data class AuthenticationQR(
    val url: String,
    val token: String,
    val username: String,
    val kind: AccountKind
)
