package ink.literate.pawnote.api.helpers

import ink.literate.pawnote.models.InstanceParameters

data class Timing(val hours: Short, val minutes: Short)

fun translatePositionToTimings(sessionInstance: InstanceParameters, position: Int): Timing {
  var finalPos = position

  if (finalPos > sessionInstance.endings.count()) finalPos %= (sessionInstance.endings.count() - 1)

  val formatted = sessionInstance.endings[position]

  val (hours, minutes) = formatted.split('h').map { it.toShort() }

  return Timing(hours, minutes)
}
