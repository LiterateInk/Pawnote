package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeNewDiscussionRecipient
import ink.literate.pawnote.models.EntityKind
import ink.literate.pawnote.models.NewDiscussionRecipient
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

/**
 * Returns a list of possible recipients when creating a discussion.
 *
 * This step is required before creating a discussion. It allows to know who can be the recipient of
 * the discussion.
 *
 * @param kind The kind of entity to create a discussion with. Only `Teacher`, `Student` and
 *   `Personal` are allowed.
 */
suspend fun newDiscussionRecipients(
    session: SessionHandle,
    kind: EntityKind
): List<NewDiscussionRecipient> {
  val user = session.userResource

  // TODO: use `ListePublics` for teachers.
  val request =
      RequestFN(
          session.information,
          "ListeRessourcesPourCommunication",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Discussions.code) }

                putJsonObject("donnees") {
                  putJsonObject("filtreElement") {
                    put("G", user.kind)
                    put("L", user.name)
                    put("N", user.id)
                  }

                  putJsonObject("onglet") {
                    put("N", 0)
                    put("G", kind.code)
                  }
                }
              }))

  val response = request.send()
  return Json.parseToJsonElement(response.data)
      .jsonObject["donnees"]!!
      .jsonObject["listeRessourcesPourCommunication"]!!
      .jsonObject["V"]!!
      .jsonArray
      .filter { it.jsonObject["avecDiscussion"]?.jsonPrimitive?.boolean ?: false }
      .map { decodeNewDiscussionRecipient(it.jsonObject) }
}
