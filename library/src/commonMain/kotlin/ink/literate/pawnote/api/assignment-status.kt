package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.EntityState
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun assignmentStatus(session: SessionHandle, assignmentID: String, done: Boolean) {
  val request =
      RequestFN(
          session.information,
          "SaisieTAFFaitEleve",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Assignments.code) }

                putJsonObject("donnees") {
                  putJsonArray("listeTAF") {
                    addJsonObject {
                      put("E", EntityState.MODIFICATION.code)
                      put("TAFFait", done)
                      put("N", assignmentID)
                    }
                  }
                }
              }))

  request.send()
}
