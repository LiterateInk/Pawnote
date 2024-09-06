package api.private

import core.RequestFN
import decoders.decodeUserParameters
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonObject
import models.InstanceParameters
import models.SessionInformation
import models.UserParameters

suspend fun userParameters (sessionInfo: SessionInformation, sessionInstance: InstanceParameters): UserParameters {
    val request = RequestFN(sessionInfo, "ParametresUtilisateur", "{}")
    val response = request.send()
    return decodeUserParameters(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, sessionInfo, sessionInstance)
}