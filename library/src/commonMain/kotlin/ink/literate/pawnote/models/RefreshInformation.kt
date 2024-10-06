package ink.literate.pawnote.models

data class RefreshInformation(
    val url: String,
    /**
     * Acts as a replacement for the password. Whenever you need to authenticate, you should use
     * this token from now on if you want to avoid entering your password again.
     *
     * Note that this token is only valid for the `deviceUUID` you provided in the authentication
     * options.
     */
    val token: String,
    val username: String,
    val kind: AccountKind,
    val navigatorIdentifier: String? = null
)
