package ink.literate.pawnote.models

data class DiscussionDraftMessage(
    val isHTML: Boolean,
    val possessionID: String,
    val replyMessageID: String,
    var content: String
)