package api

import api.private.homeworkFromIntervals
import api.private.homeworkFromWeek
import decoders.decodeAssignment
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import models.Assignment
import models.SessionHandle
import models.SessionInformation
import models.TabLocation

val decoder: (sessionInformation: SessionInformation, data: JsonObject) -> List<Assignment> = {sessionInformation, data ->
    data["ListeTravauxAFaire"]!!.jsonObject["V"]!!.jsonArray.map { decodeAssignment(it.jsonObject, sessionInformation) }
}

suspend fun assignmentsFromWeek (sessionInformation: SessionInformation, weekNumber: Int, extendsToWeekNumber: Int? = null): List<Assignment> {
    val reply = homeworkFromWeek(sessionInformation, TabLocation.Assignments, weekNumber, extendsToWeekNumber)
    return decoder(sessionInformation, reply)
}

suspend fun assignmentsFromIntervals (session: SessionHandle, startDate: LocalDateTime, endDate: LocalDateTime): List<Assignment> {
    val reply = homeworkFromIntervals(session, TabLocation.Assignments, startDate, endDate)
    // Only keep items assignments are in the intervals.
    return decoder(session.information, reply).filter { it.deadline in startDate..endDate }
}