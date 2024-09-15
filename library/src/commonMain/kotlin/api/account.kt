package api

import core.RequestFN
import decoders.decodeAccount
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.Account
import models.SessionHandle
import models.TabLocation

suspend fun account (session: SessionHandle): Account {
    val request = RequestFN(session.information, "PageInfosPerso", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Account.code)
        }
    }))

    val response = request.send()
    return decodeAccount(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, session)
}