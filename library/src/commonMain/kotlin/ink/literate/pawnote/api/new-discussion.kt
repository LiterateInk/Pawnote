package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.EntityState
import ink.literate.pawnote.models.NewDiscussionRecipient
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

/**
 * Create a discussion.
 *
 * Sadly, we can't get the ID of the created discussion or anything else related to it, you need to
 * request the discussions list once again.
 */
suspend fun newDiscussion(
    session: SessionHandle,
    subject: String,
    content: String,
    recipients: List<NewDiscussionRecipient>
) {
  val request =
      RequestFN(
          session.information,
          "SaisieMessage",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Discussions.code) }

                putJsonObject("donnees") {
                  if (session.user.authorizations.hasAdvancedDiscussionEditor)
                      putJsonObject("contenu") {
                        put("_T", 21)
                        put("V", content)
                      }
                  else put("contenu", content)

                  put("objet", subject)
                  put("estCreationCarnetLiaison", false)
                  putJsonArray("listeFichiers") {}
                  putJsonArray("listeDestinataires") {
                    for (recipient in recipients) addJsonObject {
                      put("E", EntityState.MODIFICATION.code)
                      put("G", recipient.kind.code)
                      put("N", recipient.id)
                    }
                  }
                }
              }))

  request.send()
}
