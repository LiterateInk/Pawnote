package decoders

import kotlinx.serialization.json.*
import models.NewsCategory
import models.NewsSurvey
import models.SessionInformation

fun decodeNewsSurvey (survey: JsonObject, sessionInfo: SessionInformation, categories: List<NewsCategory>): NewsSurvey {
    return NewsSurvey(
        questions = survey["listeQuestions"]!!.jsonObject["V"]!!.jsonArray.map { decodeNewsQuestion(it.jsonObject, sessionInfo) },
        isAnonymous = survey["reponseAnonyme"]!!.jsonPrimitive.boolean
    )
}