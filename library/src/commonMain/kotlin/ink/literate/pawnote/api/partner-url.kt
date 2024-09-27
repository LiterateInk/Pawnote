package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.Partner
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun partnerURL (session: SessionHandle, partner: Partner): String {
    val request = RequestFN(session.information, "SaisieURLPartenaire", Json.encodeToString(
        buildJsonObject {
            putJsonObject("_Signature_") {
                put("onglet", TabLocation.Presence.code)
            }

            putJsonObject("donnees") {
                put("SSO", partner.sso)
            }
        }
    ))

    val response = request.send()
    return Json.parseToJsonElement(response.data).jsonObject["RapportSaisie"]!!.jsonObject["urlSSO"]!!.jsonObject["V"]!!.jsonPrimitive.content
}