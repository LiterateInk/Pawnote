package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.NewsRemoteMutateOptions
import ink.literate.pawnote.api.private.newsRemoteMutate
import ink.literate.pawnote.models.NewsItem
import ink.literate.pawnote.models.SessionHandle

/**
 * Patches the `read` state of the news to the given value. Will do nothing if `read === status`.
 */
suspend fun newsRead(session: SessionHandle, item: NewsItem<Any>, read: Boolean) {
  // Do nothing if the status is already the same.
  if (item.read == read) return

  // Update the server state.
  newsRemoteMutate(
      session,
      item,
      NewsRemoteMutateOptions(onlyMarkAsRead = true, markAsRead = read, delete = false))

  // Update the local state.
  item.read = read
}
