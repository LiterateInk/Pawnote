package api

import core.RequestFN
import decoders.decodeGradesOverview
import encoders.encodePeriod
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.GradesOverview
import models.Period
import models.SessionInformation
import models.TabLocation

suspend fun gradesOverview (sessionInformation: SessionInformation, period: Period): GradesOverview {
    val request = RequestFN(sessionInformation, "DernieresNotes", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Grades.code)
        }

        putJsonObject("donnees") {
            put("Periode", encodePeriod(period))
        }
    }))

    val response = request.send()
    return decodeGradesOverview(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, sessionInformation)
}