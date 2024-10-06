package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.propertyCaseInsensitive
import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeTimetable
import ink.literate.pawnote.encoders.encodePronoteDate
import ink.literate.pawnote.encoders.encodeUserResource
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import ink.literate.pawnote.models.Timetable
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun timetable(
    session: SessionHandle,
    index: Int,
    additional: JsonObject = buildJsonObject {}
): Timetable {
  val request =
      RequestFN(
          session.information,
          "PageEmploiDuTemps",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Timetable.code) }

                put(
                    "donnees",
                    JsonObject(
                        buildJsonObject {
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
                        } +
                            propertyCaseInsensitive(
                                "ressource", encodeUserResource(session.user.resources[index])) +
                            additional))
              }))

  val response = request.send()
  return decodeTimetable(
      Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, session.instance)
}

suspend fun timetableFromWeek(session: SessionHandle, weekNumber: Int, index: Int = 0): Timetable {
  return timetable(
      session,
      index,
      propertyCaseInsensitive("numeroSemaine", Json.parseToJsonElement(weekNumber.toString())))
}

suspend fun timetableFromIntervals(
    session: SessionHandle,
    startDate: LocalDateTime,
    endDate: LocalDateTime? = null,
    index: Int = 0
): Timetable {
  return timetable(
      session,
      index,
      JsonObject(
          propertyCaseInsensitive(
              "dateDebut",
              buildJsonObject {
                put("_T", 7)
                put("V", encodePronoteDate(startDate))
              }) +
              if (endDate != null)
                  propertyCaseInsensitive(
                      "dateFin",
                      buildJsonObject {
                        put("_T", 7)
                        put("V", encodePronoteDate(endDate))
                      })
              else buildJsonObject {}))
}
