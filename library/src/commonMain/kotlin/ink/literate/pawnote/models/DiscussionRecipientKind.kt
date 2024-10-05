package ink.literate.pawnote.models

enum class DiscussionRecipientKind (val code: Int) {
    Teacher(3),
    Student(4),
    Personal(34);

    companion object {
        fun fromInt (code: Int) = entries.first { it.code == code }
    }

    fun toEntityKind() = EntityKind.fromInt(this.code)
}