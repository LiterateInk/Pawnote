package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewsInformation
import ink.literate.pawnote.models.SessionInformation
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject

fun decodeNewsInformation(
    information: JsonObject,
    sessionInformation: SessionInformation
): NewsInformation {
  return NewsInformation(
      question =
          decodeNewsQuestion(
              information["listeQuestions"]!!.jsonObject["V"]!!.jsonArray[0].jsonObject,
              sessionInformation))
}
