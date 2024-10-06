package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.NewsRemoteMutateOptions
import ink.literate.pawnote.api.private.newsRemoteMutate
import ink.literate.pawnote.models.NewsItem
import ink.literate.pawnote.models.SessionHandle

/**
 * Answers the survey with the given answers. By default, it'll answer with the questions that were
 * given when the survey was created.
 *
 * You can either manipulate the questions directly or pass in your own answers.
 */
suspend fun newsSurveySend(
    session: SessionHandle,
    survey: NewsItem<Any>,
    alsoMarkAsRead: Boolean = true
) {
  newsRemoteMutate(
      session,
      survey,
      NewsRemoteMutateOptions(markAsRead = alsoMarkAsRead, onlyMarkAsRead = false, delete = false))

  if (alsoMarkAsRead) survey.read = true
}
