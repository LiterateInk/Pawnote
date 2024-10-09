package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.DoubleAuthServerAction
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.errors.SecuritySourceTooLongError
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

/** @return true if the source is already known */
suspend fun securitySource(session: SessionHandle, source: String): Boolean {
  val LIMIT = 30
  if (source.length > LIMIT) throw SecuritySourceTooLongError(LIMIT)

  val request =
      RequestFN(
          session.information,
          "SecurisationCompteDoubleAuth",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("donnees") {
                  put("action", DoubleAuthServerAction.csch_LibellesSourceConnexionDejaConnus.code)
                  put("libelle", source)
                }
              }))

  val response = request.send()
  return Json.parseToJsonElement(response.data)
      .jsonObject["donnees"]!!
      .jsonObject["dejaConnu"]!!
      .jsonPrimitive
      .boolean
}
