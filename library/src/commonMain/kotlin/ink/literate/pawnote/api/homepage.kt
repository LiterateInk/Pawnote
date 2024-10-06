package ink.literate.pawnote.api

import ink.literate.pawnote.api.helpers.translateToWeekNumber
import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeHomepage
import ink.literate.pawnote.encoders.encodePronoteDate
import ink.literate.pawnote.models.Homepage
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun homepage(
    session: SessionHandle,
    day: LocalDateTime = session.instance.nextBusinessDay
): Homepage {
  val weekNumber = translateToWeekNumber(day, session.instance.firstMonday)
  val next = encodePronoteDate(day)

  val request =
      RequestFN(
          session.information,
          "PageAccueil",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Presence.code) }

                putJsonObject("donnees") {
                  put("avecConseilDeClasse", true)

                  putJsonObject("dateGrille") {
                    put("_T", 7)
                    put("V", next)
                  }

                  put("numeroSemaine", weekNumber)

                  putJsonObject("coursNonAssures") { put("numeroSemaine", weekNumber) }

                  putJsonObject("personnelsAbsents") { put("numeroSemaine", weekNumber) }

                  putJsonObject("incidents") { put("numeroSemaine", weekNumber) }

                  putJsonObject("exclusions") { put("numeroSemaine", weekNumber) }

                  putJsonObject("donneesVS") { put("numeroSemaine", weekNumber) }

                  putJsonObject("registreAppel") {
                    putJsonObject("date") {
                      put("_T", 7)
                      put("V", next)
                    }
                  }

                  putJsonObject("previsionnelAbsServiceAnnexe") {
                    putJsonObject("date") {
                      put("_T", 7)
                      put("V", next)
                    }
                  }

                  putJsonObject("donneesProfs") { put("numeroSemaine", weekNumber) }

                  putJsonObject("EDT") { put("numeroSemaine", weekNumber) }

                  putJsonObject("TAFARendre") {
                    putJsonObject("date") {
                      put("_T", 7)
                      put("V", next)
                    }
                  }

                  putJsonObject("partenaireCDI") { putJsonObject("CDI") {} }

                  putJsonObject("tableauDeBord") {
                    putJsonObject("date") {
                      put("_T", 7)
                      put("V", next)
                    }
                  }

                  putJsonObject("modificationsEDT") {
                    putJsonObject("date") {
                      put("_T", 7)
                      put("V", next)
                    }
                  }
                }
              }))

  val response = request.send()
  return decodeHomepage(
      Json.decodeFromString<JsonObject>(response.data).jsonObject["donnees"]!!.jsonObject)
}
