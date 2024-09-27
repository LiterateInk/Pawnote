package ink.literate.pawnote.models

enum class AccountKind (val code: Int) {
    STUDENT(6),
    PARENT(7),
    TEACHER(8);

    companion object {
        fun fromInt(code: Int) = entries.first {it.code == code}
    }
}