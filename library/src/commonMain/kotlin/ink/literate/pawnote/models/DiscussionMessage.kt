package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class DiscussionMessage<T>(
    val id: String,
    val content: String,
    val creationDate: LocalDateTime,
    /** When undefined, the author is the user itself. */
    val author: DiscussionMessageRecipient? = null,
    /** When undefined, the receiver is the user itself. */
    val receiver: DiscussionMessageRecipient? = null,
    val partialVisibility: Boolean,
    val amountOfRecipients: Int,
    val files: List<Attachment>,
    val data: T
)
