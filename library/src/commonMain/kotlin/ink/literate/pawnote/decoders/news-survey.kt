package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewsCategory
import ink.literate.pawnote.models.NewsSurvey
import ink.literate.pawnote.models.SessionInformation

import kotlinx.serialization.json.*

fun decodeNewsSurvey (survey: JsonObject, sessionInfo: SessionInformation, categories: List<NewsCategory>): NewsSurvey {
    return NewsSurvey(
        questions = survey["listeQuestions"]!!.jsonObject["V"]!!.jsonArray.map { decodeNewsQuestion(it.jsonObject, sessionInfo) },
        isAnonymous = survey["reponseAnonyme"]!!.jsonPrimitive.boolean
    )
}