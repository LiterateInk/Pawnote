package ink.literate.pawnote.models

data class DiscussionSentMessage(
    val replyMessageID: String,
    val replyingTo: DiscussionMessage<DiscussionSentMessage>? = null,
    val transferredMessages: List<DiscussionMessage<DiscussionSentMessage>>
)
