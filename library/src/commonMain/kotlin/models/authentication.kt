package models

data class CredentialsAuth(
    val url: String,
    val username: String,
    val password: String,
    val kind: AccountKind,
    val deviceUUID: String
)

data class LoginResult(
    val session: SessionHandle,
    val refreshInfo: RefreshInformation
)