package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeDiscussionRecipient
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionRecipient
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun discussionRecipients(
    session: SessionHandle,
    discussion: Discussion
): List<DiscussionRecipient> {
  val request =
      RequestFN(
          session.information,
          "SaisiePublicMessage",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Discussions.code) }

                putJsonObject("donnees") {
                  putJsonObject("message") { put("N", discussion.participantsMessageID) }
                  put("estPublicParticipant", true)
                  put("estDestinataireReponse", false)
                }
              }))

  val response = request.send()
  return Json.parseToJsonElement(response.data)
      .jsonObject["donnees"]!!
      .jsonObject["listeDest"]!!
      .jsonObject["V"]!!
      .jsonArray
      .map { decodeDiscussionRecipient(it.jsonObject) }
}
