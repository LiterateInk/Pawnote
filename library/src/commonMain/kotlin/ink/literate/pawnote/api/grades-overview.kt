package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeGradesOverview
import ink.literate.pawnote.encoders.encodePeriod
import ink.literate.pawnote.models.GradesOverview
import ink.literate.pawnote.models.Period
import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun gradesOverview(sessionInformation: SessionInformation, period: Period): GradesOverview {
  val request =
      RequestFN(
          sessionInformation,
          "DernieresNotes",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Grades.code) }

                putJsonObject("donnees") { put("Periode", encodePeriod(period)) }
              }))

  val response = request.send()
  return decodeGradesOverview(
      Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, sessionInformation)
}
