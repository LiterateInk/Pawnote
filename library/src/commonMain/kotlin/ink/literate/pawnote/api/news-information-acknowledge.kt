package ink.literate.pawnote.api

import ink.literate.pawnote.api.helpers.newsQuestionLocalMutate
import ink.literate.pawnote.api.private.NewsRemoteMutateOptions
import ink.literate.pawnote.api.private.newsRemoteMutate
import ink.literate.pawnote.models.NewsInformation
import ink.literate.pawnote.models.NewsItem
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.errors.NewsTypeError

/**
 * Will acknowledge the news if needed,
 * so if the news doesn't need to be acknowledged (`!needToAcknowledge`)
 * or is already `acknowledged`, we will just do the read step.
 *
 * When acknowledging, the news will be directly marked as read.
 * If you want to change this behavior, you can change the `alsoMarkAsRead` parameter.
 *
 * You can't un-acknowledge a news.
 */
suspend fun newsInformationAcknowledge (
    session: SessionHandle,
    information: NewsItem<Any>,
    alsoMarkAsRead: Boolean = true
) {
    if (information.data !is NewsInformation)
        throw NewsTypeError("NewsInformation")

    if (!information.data.needToAcknowledge || information.data.acknowledged)
        return newsRead(session, information, alsoMarkAsRead)

    // An empty string is needed to acknowledge.
    newsQuestionLocalMutate(information.data.question, "")

    newsRemoteMutate(session, information, NewsRemoteMutateOptions(
        markAsRead = alsoMarkAsRead,
        onlyMarkAsRead = false,
        delete = false
    ))

    if (alsoMarkAsRead)
        information.read = true
}