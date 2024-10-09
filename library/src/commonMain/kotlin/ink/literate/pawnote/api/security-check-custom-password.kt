package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.AES
import ink.literate.pawnote.api.private.aesKeys
import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.DoubleAuthServerAction
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun securityCheckCustomPassword(session: SessionHandle, newPassword: String): Boolean {
  val keys = aesKeys(session.information)

  val request =
      RequestFN(
          session.information,
          "SecurisationCompteDoubleAuth",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("donnees") {
                  put("action", DoubleAuthServerAction.csch_VerifierMotDePassePersonnalise.code)
                  put("nouveauMDP", AES.encrypt(newPassword.toByteArray(), keys.key, keys.iv))
                }
              }))

  val response = request.send()
  return Json.parseToJsonElement(response.data)
      .jsonObject["donnees"]!!
      .jsonObject["result"]!!
      .jsonPrimitive
      .boolean
}
