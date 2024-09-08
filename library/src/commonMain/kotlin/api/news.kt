package api

import core.RequestFN
import decoders.decodeNews
import encoders.encodeDomain
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.News
import models.SessionInformation
import models.TabLocation

suspend fun news (sessionInformation: SessionInformation): News {
    val request = RequestFN(sessionInformation, "PageActualites", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.News.code)
        }

        putJsonObject("donnees") {
            putJsonObject("modesAffActus") {
                put("_T", 26)
                put("V", encodeDomain(listOf(0)))
            }
        }
    }))

    val response = request.send()
    return decodeNews(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, sessionInformation)
}