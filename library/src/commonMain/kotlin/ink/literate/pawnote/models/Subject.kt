package ink.literate.pawnote.models

data class Subject(
    val id: String,
    val name: String,

    /**
     * Whether the subject is only within groups.
     */
    val inGroups: Boolean
)