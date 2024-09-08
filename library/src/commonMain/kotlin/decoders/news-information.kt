package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import models.NewsInformation
import models.SessionInformation

fun decodeNewsInformation (information: JsonObject, sessionInformation: SessionInformation): NewsInformation {
    return NewsInformation(
        question = decodeNewsQuestion(information["listeQuestions"]!!.jsonObject["V"]!!.jsonArray[0].jsonObject, sessionInformation)
    )
}