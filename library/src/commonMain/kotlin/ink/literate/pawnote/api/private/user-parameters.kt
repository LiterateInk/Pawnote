package ink.literate.pawnote.api.private

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeUserParameters
import ink.literate.pawnote.models.InstanceParameters
import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.UserParameters
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject

suspend fun userParameters(
    sessionInfo: SessionInformation,
    sessionInstance: InstanceParameters
): UserParameters {
  val request = RequestFN(sessionInfo, "ParametresUtilisateur", "{}")
  val response = request.send()
  return decodeUserParameters(
      Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject,
      sessionInfo,
      sessionInstance)
}
