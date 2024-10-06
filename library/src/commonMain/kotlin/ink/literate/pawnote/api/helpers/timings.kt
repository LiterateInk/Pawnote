package ink.literate.pawnote.api.helpers

import ink.literate.pawnote.models.SessionHandle

data class Timing(val hours: Short, val minutes: Short)

fun translatePositionToTimings(session: SessionHandle, position: Int): Timing {
  var finalPos = position

  if (finalPos > session.instance.endings.count())
      finalPos %= (session.instance.endings.count() - 1)

  val formatted = session.instance.endings[position]

  val (hours, minutes) = formatted.split('h').map { it.toShort() }

  return Timing(hours, minutes)
}
