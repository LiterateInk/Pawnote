package decoders

import api.helpers.translatePositionToTimings
import api.helpers.translateToWeekNumber
import kotlinx.datetime.*
import kotlinx.serialization.json.*
import models.SessionHandle
import models.TimetableClass

fun decodeTimetableClass (item: JsonObject, session: SessionHandle, decoder: (item: JsonObject) -> Any): TimetableClass<Any> {
    val startDate = decodePronoteDate(item["DateDuCours"]!!.jsonObject["V"]!!.jsonPrimitive.content)
    val blockPosition = item["place"]!!.jsonPrimitive.int
    val blockLength = item["duree"]!!.jsonPrimitive.double
    val endDate: LocalDateTime

    if (item.containsKey("DateDuCoursFin")) {
        if (item["DateDuCoursFin"]!!.jsonObject["V"]!!.jsonPrimitive.isString)
            endDate = decodePronoteDate(item["DateDuCoursFin"]!!.jsonObject["V"]!!.jsonPrimitive.content)
        else {
            val position = blockPosition % session.instance.blocksPerDay + blockLength - 1
            val timings = translatePositionToTimings(session, position.toInt())

            val time = LocalTime(timings.hours.toInt(), timings.minutes.toInt())
            endDate = LocalDateTime(startDate.date, time)
        }
    } else {
        val position = blockPosition % session.instance.blocksPerDay + blockLength - 1
        val timings = translatePositionToTimings(session, position.toInt())

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
        weekNumber = translateToWeekNumber(startDate, session.instance.firstMonday),
        data = decoder(item)
    )
}