package ink.literate.pawnote.models

data class PasswordRules(
    val maxLength: Int,
    val minLength: Int,

    val rules: List<Int> // TODO: type the numbers to an enum
)