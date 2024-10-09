package ink.literate.pawnote.api.private

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.DiscussionCommand
import ink.literate.pawnote.models.EntityState
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun discussionPostCommand(
    session: SessionHandle,
    command: DiscussionCommand? = null,
    extra: JsonObject
) {
  val payload: JsonObject

  when (command) {
    DiscussionCommand.brouillon -> payload = buildJsonObject {
          put("commande", command.value)
          put(
              "brouillon",
              when (extra["id"]!!.jsonPrimitive.intOrNull != null) {
                true ->
                    buildJsonObject {
                      put("E", EntityState.CREATION.code)
                      put("N", extra["id"]!!)
                    }
                false ->
                    buildJsonObject {
                      put("E", EntityState.MODIFICATION.code)
                      put("N", extra["id"]!!)
                    }
              })

          put("contenu", extra["content"]!!)

          putJsonObject("messagePourReponse") {
            put("G", 0)
            put("N", extra["replyMessageID"]!!)
          }

          putJsonArray("listeDestinataires") {}
          putJsonArray("listeFichiers") {}
          put("objet", "")
        }
    null -> payload = buildJsonObject {
          put("commande", "")
          putJsonObject("bouton") {
            put("N", 0)
            put("G", extra["button"]!!)
          }

          putJsonObject("brouillon") { put("N", extra["id"]!!) }

          put("contenu", extra["content"]!!)

          putJsonArray("listeDestinataires") {}
          putJsonArray("listeFichiers") {}

          putJsonObject("messagePourReponse") {
            put("G", 0)
            put("N", extra["replyMessageID"]!!)
          }
        }
    else -> payload = buildJsonObject {
          put("commande", command.value)
          put("listePossessionsMessages", extra["possessions"]!!)
        }
  }

  val request =
      RequestFN(
          session.information,
          "SaisieMessage",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Discussions.code) }

                put("donnees", payload)
              }))

  request.send()
}
