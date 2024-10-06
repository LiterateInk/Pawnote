package ink.literate.pawnote.models

data class NewDiscussionRecipient(
    val name: String,
    val kind: DiscussionRecipientKind,
    val id: String,
    val isPrincipal: Boolean,
    val subjects: List<NewDiscussionRecipientSubject>,
    val function: NewDiscussionRecipientFunction? = null
)