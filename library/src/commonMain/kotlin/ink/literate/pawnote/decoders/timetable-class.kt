package ink.literate.pawnote.decoders

import ink.literate.pawnote.api.helpers.translatePositionToTimings
import ink.literate.pawnote.api.helpers.translateToWeekNumber
import ink.literate.pawnote.models.InstanceParameters
import ink.literate.pawnote.models.TimetableClass
import kotlinx.datetime.*
import kotlinx.serialization.json.*

fun decodeTimetableClass(
    item: JsonObject,
    sessionInstance: InstanceParameters,
    decoder: (item: JsonObject) -> Any
): TimetableClass<Any> {
  val startDate = decodePronoteDate(item["DateDuCours"]!!.jsonObject["V"]!!.jsonPrimitive.content)
  val blockPosition = item["place"]!!.jsonPrimitive.int
  val blockLength = item["duree"]!!.jsonPrimitive.double
  val endDate: LocalDateTime

  if (item.containsKey("DateDuCoursFin")) {
    if (item["DateDuCoursFin"]!!.jsonObject["V"]!!.jsonPrimitive.isString)
        endDate =
            decodePronoteDate(item["DateDuCoursFin"]!!.jsonObject["V"]!!.jsonPrimitive.content)
    else {
      val position = blockPosition % sessionInstance.blocksPerDay + blockLength - 1
      val timings = translatePositionToTimings(sessionInstance, position.toInt())

      val time = LocalTime(timings.hours.toInt(), timings.minutes.toInt())
      endDate = LocalDateTime(startDate.date, time)
    }
  } else {
    val position = blockPosition % sessionInstance.blocksPerDay + blockLength - 1
    val timings = translatePositionToTimings(sessionInstance, position.toInt())

    val time = LocalTime(timings.hours.toInt(), timings.minutes.toInt())
    endDate = LocalDateTime(startDate.date, time)
  }

  return TimetableClass(
      id = item["N"]!!.jsonPrimitive.content,
      backgroundColor = item["CouleurFond"]?.jsonPrimitive?.content,
      notes = item["memo"]?.jsonPrimitive?.content,
      startDate = startDate,
      endDate = endDate,
      blockLength = blockLength,
      blockPosition = blockPosition,
      weekNumber = translateToWeekNumber(startDate, sessionInstance.firstMonday),
      data = decoder(item))
}
