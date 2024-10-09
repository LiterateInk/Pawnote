package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NotebookAbsence
import kotlinx.serialization.json.*

fun decodeNotebookAbsence(absence: JsonObject): NotebookAbsence {
  val (hoursMissed, minutesMissed) =
      absence["NbrHeures"]!!.jsonPrimitive.content.split('h').map { it.toInt() }
  val isReasonUnknown = absence["estMotifNonEncoreConnu"]!!.jsonPrimitive.boolean

  return NotebookAbsence(
      id = absence["N"]!!.jsonPrimitive.content,
      startDate = decodePronoteDate(absence["dateDebut"]!!.jsonObject["V"]!!.jsonPrimitive.content),
      endDate = decodePronoteDate(absence["dateFin"]!!.jsonObject["V"]!!.jsonPrimitive.content),
      justified = absence["justifie"]!!.jsonPrimitive.boolean,
      opened = absence["ouverte"]!!.jsonPrimitive.boolean,
      hoursMissed = hoursMissed,
      minutesMissed = minutesMissed,
      daysMissed = absence["NbrJours"]!!.jsonPrimitive.double,
      shouldParentsJustify = absence["aJustifierParParents"]!!.jsonPrimitive.boolean,
      administrativelyFixed = absence["reglee"]!!.jsonPrimitive.boolean,
      isReasonUnknown = isReasonUnknown,
      reason =
          if (!isReasonUnknown)
              absence["listeMotifs"]!!
                  .jsonObject["V"]!!
                  .jsonArray[0]
                  .jsonObject["L"]!!
                  .jsonPrimitive
                  .content
          else null)
}
