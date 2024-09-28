package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.api.private.AES
import ink.literate.pawnote.api.private.aesKeys
import ink.literate.pawnote.models.DoubleAuthMode
import ink.literate.pawnote.models.DoubleAuthServerAction
import ink.literate.pawnote.models.SecurityModal
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

data class SecSaveOptions(
    val password: String? = null,
    val deviceName: String? = null,
    val pin: String? = null,
    val mode: DoubleAuthMode? = null
)

suspend fun securitySave (session: SessionHandle, handle: SecurityModal, options: SecSaveOptions) {
    var data = buildJsonObject {
        put("action", DoubleAuthServerAction.csch_EnregistrerChoixUtilisateur.code)
    }

    val keys = aesKeys(session.information)

    if (options.mode != null)
        data = JsonObject(data + buildJsonObject { put("mode", options.mode.code) })

    if (options.password != null)
        data = JsonObject(data + buildJsonObject { put("nouveauMDP", AES.encrypt(options.password.toByteArray(), keys.key, keys.iv)) })

    if (options.pin != null)
        data = JsonObject(data + buildJsonObject { put("codePin", AES.encrypt(options.pin.toByteArray(), keys.key, keys.iv)) })

    if (options.deviceName != null) {
        data = JsonObject(data + buildJsonObject {
            put("avecIdentification", true)
            put("strIdentification", options.deviceName)
        })
    }

    val request = RequestFN(session.information, "SecurisationCompteDoubleAuth", Json.encodeToString(
        buildJsonObject {
            put("donnees", data)
        }
    ))

    val response = request.send()
    val token = Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject["jetonConnexionAppliMobile"]?.jsonPrimitive?.content

    if (token != null)
        handle.context.authentication = JsonObject(handle.context.authentication + buildJsonObject {
            put("jetonConnexionAppliMobile", token)
        })
}