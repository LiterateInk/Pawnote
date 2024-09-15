package api

import api.private.propertyCaseInsensitive
import core.RequestFN
import decoders.decodeTimetable
import encoders.encodePronoteDate
import encoders.encodeUserResource
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.SessionHandle
import models.TabLocation
import models.Timetable

suspend fun timetable (session: SessionHandle, index: Int, additional: JsonObject = buildJsonObject {  }): Timetable {
    val request = RequestFN(session.information, "PageEmploiDuTemps", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Timetable.code)
        }

        put("donnees", JsonObject(buildJsonObject {
                put("estEDTAnnuel", false)
                put("estEDTPermanence", false)

                put("avecAbsencesEleve", false)
                put("avecRessourcesLibrePiedHoraire", false)

                put("avecAbsencesRessource", true)
                put("avecInfosPrefsGrille", true)
                put("avecConseilDeClasse", true)
                put("avecCoursSortiePeda", true)
                put("avecDisponibilites", true)
                put("avecRetenuesEleve", true)

                putJsonObject("edit") {
                    put("G", 16)
                    put("L", "Emploi du temps")
                }
            } + propertyCaseInsensitive("ressource", encodeUserResource(session.user.resources[index])) + additional)
        )
    }))

    val response = request.send()
    return decodeTimetable(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, session)
}

suspend fun timetableFromWeek (session: SessionHandle, weekNumber: Int, index: Int = 0): Timetable {
    return timetable(session, index, propertyCaseInsensitive("numeroSemaine", Json.parseToJsonElement(weekNumber.toString())))
}

suspend fun timetableFromIntervals (session: SessionHandle, startDate: LocalDateTime, endDate: LocalDateTime? = null, index: Int = 0): Timetable {
    return timetable(session, index, JsonObject(propertyCaseInsensitive("dateDebut", buildJsonObject {
        put("_T", 7)
        put("V", encodePronoteDate(startDate))
    }) + if(endDate != null) propertyCaseInsensitive("dateFin", buildJsonObject {
        put("_T", 7)
        put("V", encodePronoteDate(endDate))
    }) else buildJsonObject {  }))
}