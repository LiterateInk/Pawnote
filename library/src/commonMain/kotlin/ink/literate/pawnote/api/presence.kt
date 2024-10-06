package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonObject

suspend fun presence(session: SessionHandle) {
  val request =
      RequestFN(
          session.information,
          "Presence",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Presence.code) }
              }))

  request.send()
}
