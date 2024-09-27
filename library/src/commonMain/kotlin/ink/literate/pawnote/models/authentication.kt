package ink.literate.pawnote.models

data class CredentialsAuth(
    val url: String,
    val username: String,
    val password: String? = null,
    val token: String? = null,
    val kind: AccountKind,
    val deviceUUID: String,
    val navigatorIdentifier: String? = null
)

data class LoginResult(
    val session: SessionHandle,
    val refreshInfo: RefreshInformation
)