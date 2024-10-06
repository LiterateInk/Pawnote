package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.DiscussionDraftMessage
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeDiscussionDraftMessage(draft: JsonObject): DiscussionDraftMessage {
  val isHTML = draft["estHTML"]?.jsonPrimitive?.boolean ?: false

  return DiscussionDraftMessage(
      possessionID =
          draft["possessionMessage"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content,
      replyMessageID =
          draft["messageSource"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content,
      content =
          if (isHTML) draft["contenu"]!!.jsonObject["V"]!!.jsonPrimitive.content
          else draft["contenu"]!!.jsonPrimitive.content,
      isHTML = isHTML)
}
