package models

enum class SessionAccessKind {
    ACCOUNT,
    ACCOUNT_CONNECTION,
    DIRECT_CONNECTION,
    TOKEN_ACCOUNT_CONNECTION,
    TOKEN_DIRECT_CONNECTION,
    COOKIE_CONNECTION;

    companion object {
        fun fromInt(ordinal: Int) = entries.first {it.ordinal == ordinal}
    }
}