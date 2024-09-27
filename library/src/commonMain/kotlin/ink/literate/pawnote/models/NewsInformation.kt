package ink.literate.pawnote.models

data class NewsInformation(
    /**
     * Low level data about the "question" contained inside this information.
     *
     * Internally, `acknowledged`, `content`, `attachments`, ... are getters for this,
     * we're just renaming the properties to make the naming better.
     *
     * @remark Most of the time, you won't need this, but it's here if you need it.
     */
    val question: NewsQuestion
) {
    val type: String = "information"
    val attachments = question.attachments

    /**
     * Whether this news have been acknowledged or not.
     * @remark This is not the same as reading the news, see `read` property.
     */
    val acknowledged = question.answered

    /**
     * Date when the news have been acknowledged.
     * Only available if `acknowledged` is `true`.
     */
    val acknowledgedDate = question.answerDate

    val needToAcknowledge = question.shouldAnswer
    val content = question.content
}