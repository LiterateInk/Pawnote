package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.DiscussionMessage
import ink.literate.pawnote.models.DiscussionSentMessage
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeDiscussionSentMessage(
    message: JsonObject,
    session: SessionHandle,
    sents: List<DiscussionMessage<DiscussionSentMessage>> = listOf()
): DiscussionSentMessage {
  val transferredMessages: MutableList<DiscussionMessage<DiscussionSentMessage>> = mutableListOf()
  val replyMessageID =
      message["messageSource"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content

  if (message["listeMessagesPourContexte"] != null)
      for (transferredMessage in
          message["listeMessagesPourContexte"]!!.jsonObject["V"]!!.jsonArray) {
        val decoded =
            decodeDiscussionMessage<DiscussionSentMessage>(
                transferredMessage.jsonObject,
                session,
                { decodeDiscussionSentMessage(it, session) })

        transferredMessages.add(decoded)
      }

  val replyingTo = sents.find { it.id == replyMessageID }

  return DiscussionSentMessage(
      transferredMessages = transferredMessages,
      replyMessageID = replyMessageID,
      replyingTo = replyingTo)
}
