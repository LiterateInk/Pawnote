package ink.literate.pawnote.models

data class DiscussionSentMessage(
    val replyMessageID: String,
    val replyingTo: DiscussionMessage? = null,
    val transferredMessages: List<DiscussionMessage>
)