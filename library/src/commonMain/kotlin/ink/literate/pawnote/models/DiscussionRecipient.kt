package ink.literate.pawnote.models

data class DiscussionRecipient(
    val id: String,
    val name: String,
    val kind: DiscussionRecipientKind,
    val disallowMessages: Boolean
)
