package api

import core.RequestFN
import decoders.decodeEvaluation
import encoders.encodePeriod
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.Evaluation
import models.Period
import models.SessionHandle
import models.TabLocation

suspend fun evaluations (session: SessionHandle, period: Period): List<Evaluation> {
    val request = RequestFN(session.information, "DernieresEvaluations", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Evaluations.code)
        }

        putJsonObject("donnees") {
            put("periode", encodePeriod(period))
        }
    }))

    val response = request.send()

    return Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject["listeEvaluations"]!!.jsonObject["V"]!!.jsonArray.map { decodeEvaluation(it.jsonObject) }
}