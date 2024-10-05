package ink.literate.pawnote.models

data class DiscussionMessages(
    val defaultReplyMessageID: String,
    val sents: List<DiscussionMessage<DiscussionSentMessage>>,
    val drafts: List<DiscussionDraftMessage>,

    /**
     * Can't create message in the discussion if
     * this is not defined.
     */
    val sendAction: DiscussionSendAction? = null,

    /**
     * Whether the button "include students and parents"
     * appears on the UI or not.
     */
    val canIncludeStudentsAndParents: Boolean
)