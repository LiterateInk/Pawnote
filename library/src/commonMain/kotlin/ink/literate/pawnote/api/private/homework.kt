package ink.literate.pawnote.api.private

import ink.literate.pawnote.api.helpers.translateToWeekNumber
import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.TabLocation

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun homeworkFromWeek (sessionInformation: SessionInformation, tab: TabLocation, weekNumber: Int, extendsToWeekNumber: Int? = null): JsonObject {
    val request = RequestFN(sessionInformation, "PageCahierDeTexte", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", tab.code)
        }

        putJsonObject("donnees") {
            putJsonObject("domaine") {
                put("_T", 8)
                put("V", if (extendsToWeekNumber != null) "[$weekNumber..$extendsToWeekNumber]" else "[$weekNumber]")
            }
        }
    }))

    val response = request.send()
    return Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject
}

suspend fun homeworkFromIntervals (session: SessionHandle, tab: TabLocation, startDate: LocalDateTime, endDate: LocalDateTime): JsonObject {
    val startWeekNumber = translateToWeekNumber(startDate, session.instance.firstMonday)
    val endWeekNumber = translateToWeekNumber(endDate, session.instance.firstMonday)

    return homeworkFromWeek(session.information, tab, startWeekNumber, endWeekNumber)
}