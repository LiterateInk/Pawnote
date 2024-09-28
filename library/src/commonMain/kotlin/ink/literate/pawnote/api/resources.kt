package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.homeworkFromIntervals
import ink.literate.pawnote.api.private.homeworkFromWeek
import ink.literate.pawnote.decoders.decodeResource
import ink.literate.pawnote.models.Resource
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject

fun decoder (session: SessionHandle, data: JsonObject) = data["ListeCahierDeTextes"]!!.jsonObject["V"]!!.jsonArray.map { decodeResource(it.jsonObject, session) }

suspend fun resourcesFromWeek (session: SessionHandle, weekNumber: Int, extendsToWeekNumber: Int? = null): List<Resource> {
    val reply = homeworkFromWeek(session.information, TabLocation.Resources, weekNumber, extendsToWeekNumber)
    return decoder(session, reply)
}

suspend fun resourcesFromIntervals (session: SessionHandle, startDate: LocalDateTime, endDate: LocalDateTime): List<Resource> {
    val reply = homeworkFromIntervals(session, TabLocation.Resources, startDate, endDate)
    return decoder(session, reply).filter { lesson -> lesson.endDate in startDate..endDate }
}