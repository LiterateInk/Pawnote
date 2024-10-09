package ink.literate.pawnote.api

import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.SessionHandle

/**
 * Mark a discussion as read.
 *
 * Shortcut of `discussionMessages` but here we don't return anything.
 */
suspend fun discussionRead(session: SessionHandle, discussion: Discussion) {
  discussionMessages(session, discussion, markAsRead = true)
}
