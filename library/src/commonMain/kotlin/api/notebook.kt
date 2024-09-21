package api

import core.RequestFN
import decoders.decodeNotebook
import encoders.encodePeriod
import encoders.encodePronoteDate
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.Notebook
import models.Period
import models.SessionHandle
import models.TabLocation

suspend fun notebook (session: SessionHandle, period: Period): Notebook {
    val request = RequestFN(session.information, "PagePresence", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Notebook.code)
        }

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
    return decodeNotebook(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, session)
}