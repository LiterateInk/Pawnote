package models

data class UserParameters(
    val id: String,
    val kind: Int,
    val name: String,

    val authorizations: UserAuthorizations,
    val resources: List<UserResource>
)
