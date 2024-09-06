package api.private

import core.RequestFN
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.SessionHandle
import models.SessionInformation

data class IdentifyParameters(
    val requestFirstMobileAuthentication: Boolean,
    val reuseMobileAuthentication: Boolean,
    val requestFromQRCode: Boolean,
    val useCAS: Boolean,

    val username: String,
    val deviceUUID: String
)

data class IdentifyResponse(
    val modeCompLog: Int,
    val modeCompMdp: Int,
    val login: String? = null,
    val alea: String? = null,
    val challenge: String
)

suspend fun identify(sessionInfo: SessionInformation, parameters: IdentifyParameters): IdentifyResponse {
    val requestData = buildJsonObject {
        putJsonObject("donnees") {
            put("genreConnexion", 0)
            put("genreEspace", sessionInfo.accountKind.code)
            put("identifiant", parameters.username)
            put("pourEnt", parameters.useCAS)
            put("enConnexionAuto", false)
            put("enConnexionAppliMobile", parameters.reuseMobileAuthentication)
            put("demandeConnexionAuto", false)
            put("demandeConnexionAppliMobile", parameters.requestFirstMobileAuthentication)
            put("demandeConnexionAppliMobileJeton", parameters.requestFromQRCode)
            put("uuidAppliMobile", parameters.deviceUUID)
            put("loginTokenSAV", "")
        }
    }

    val request = RequestFN(sessionInfo, "Identification", Json.encodeToString(requestData))
    val response = request.send()

    val data = Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject

    return IdentifyResponse(
        modeCompLog = data["modeCompLog"]!!.jsonPrimitive.int,
        modeCompMdp = data["modeCompMdp"]!!.jsonPrimitive.int,
        login = data["login"]?.jsonPrimitive?.content,
        alea = data["alea"]?.jsonPrimitive?.content,
        challenge = data["challenge"]!!.jsonPrimitive.content
    )
}