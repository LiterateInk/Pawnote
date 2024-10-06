package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeEvaluation
import ink.literate.pawnote.encoders.encodePeriod
import ink.literate.pawnote.models.Evaluation
import ink.literate.pawnote.models.Period
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun evaluations(session: SessionHandle, period: Period): List<Evaluation> {
  val request =
      RequestFN(
          session.information,
          "DernieresEvaluations",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Evaluations.code) }

                putJsonObject("donnees") { put("periode", encodePeriod(period)) }
              }))

  val response = request.send()

  return Json.parseToJsonElement(response.data)
      .jsonObject["donnees"]!!
      .jsonObject["listeEvaluations"]!!
      .jsonObject["V"]!!
      .jsonArray
      .map { decodeEvaluation(it.jsonObject) }
}
