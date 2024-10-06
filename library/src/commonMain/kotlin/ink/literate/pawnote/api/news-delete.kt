package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.NewsRemoteMutateOptions
import ink.literate.pawnote.api.private.newsRemoteMutate
import ink.literate.pawnote.models.NewsItem
import ink.literate.pawnote.models.SessionHandle

/** Will delete the item from the user's news feed. You can never get the item back after this. */
suspend fun newsDelete(session: SessionHandle, item: NewsItem<Any>) {
  newsRemoteMutate(
      session,
      item,
      NewsRemoteMutateOptions(onlyMarkAsRead = false, markAsRead = false, delete = true))
}
