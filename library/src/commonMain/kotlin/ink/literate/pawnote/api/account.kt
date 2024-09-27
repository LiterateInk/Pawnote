package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeAccount
import ink.literate.pawnote.models.Account
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun account (session: SessionHandle): Account {
    val request = RequestFN(session.information, "PageInfosPerso", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Account.code)
        }
    }))

    val response = request.send()
    return decodeAccount(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, session)
}