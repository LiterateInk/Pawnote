package ink.literate.pawnote.models

data class NewDiscussionRecipientSubject(
    val id: String,
    val name: String,
    val sub: List<NewDiscussionRecipientSubSubject>
)