package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.DiscussionRecipientKind
import ink.literate.pawnote.models.NewDiscussionRecipient
import ink.literate.pawnote.models.NewDiscussionRecipientSubject
import kotlinx.serialization.json.*

fun decodeNewDiscussionRecipient(recipient: JsonObject): NewDiscussionRecipient {
  val subjects: MutableList<NewDiscussionRecipientSubject> = mutableListOf()

  if (recipient["listeRessources"] != null) {
    val sub =
        recipient["listeRessources"]!!
            .jsonObject["V"]!!
            .jsonArray
            .filter { it.jsonObject["estUneSousMatiere"]?.jsonPrimitive?.boolean ?: false }
            .map { decodeNewDiscussionRecipientSubSubject(it.jsonObject) }

    for (resource in recipient["listeRessources"]!!.jsonObject["V"]!!.jsonArray) {
      if (resource.jsonObject["estUneSousMatiere"]?.jsonPrimitive?.boolean == true) continue
      subjects.add(
          decodeNewDiscussionRecipientSubject(
              resource.jsonObject,
              sub.filter { it.from == resource.jsonObject["L"]!!.jsonPrimitive.content }))
    }
  }

  return NewDiscussionRecipient(
      id = recipient["N"]!!.jsonPrimitive.content,
      name = recipient["L"]!!.jsonPrimitive.content,
      kind = DiscussionRecipientKind.fromInt(recipient["G"]!!.jsonPrimitive.int),
      subjects = subjects,
      function =
          if (recipient["fonction"] != null)
              decodeNewDiscussionRecipientFunction(
                  recipient["fonction"]!!.jsonObject["V"]!!.jsonObject)
          else null,
      isPrincipal = recipient["estPrincipal"]?.jsonPrimitive?.boolean ?: false)
}
