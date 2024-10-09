package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeNotebook
import ink.literate.pawnote.encoders.encodePeriod
import ink.literate.pawnote.encoders.encodePronoteDate
import ink.literate.pawnote.models.Notebook
import ink.literate.pawnote.models.Period
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun notebook(session: SessionHandle, period: Period): Notebook {
  val request =
      RequestFN(
          session.information,
          "PagePresence",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Notebook.code) }

                putJsonObject("donnees") {
                  put("periode", encodePeriod(period))

                  putJsonObject("DateDebut") {
                    put("_T", 7)
                    put("V", encodePronoteDate(period.startDate))
                  }

                  putJsonObject("DateFin") {
                    put("_T", 7)
                    put("V", encodePronoteDate(period.endDate))
                  }
                }
              }))

  val response = request.send()
  return decodeNotebook(
      Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, session)
}
