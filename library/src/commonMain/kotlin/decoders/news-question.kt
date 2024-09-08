package decoders

import kotlinx.serialization.json.*
import models.NewsQuestion
import models.NewsQuestionKind
import models.SessionInformation

fun decodeNewsQuestion (question: JsonObject, sessionInformation: SessionInformation): NewsQuestion {
    val kind: NewsQuestionKind = NewsQuestionKind.fromInt(question["genreReponse"]!!.jsonPrimitive.int)
    val answered = question["reponse"]!!.jsonObject["V"]!!.jsonObject["avecReponse"]!!.jsonPrimitive.boolean

    var selectedAnswers: List<Int>? = null
    var textInputAnswer: String? = null

    if (answered && question["reponse"]!!.jsonObject["V"]!!.jsonObject["valeurReponse"] != null) {
        if (question["reponse"]!!.jsonObject["V"]!!.jsonObject["valeurReponse"]!!.jsonPrimitive.isString)
            textInputAnswer = question["reponse"]!!.jsonObject["V"]!!.jsonObject["valeurReponse"]!!.jsonPrimitive.content
        else {
            selectedAnswers = decodeDomain(question["reponse"]!!.jsonObject["V"]!!.jsonObject["valeurReponse"]!!.jsonObject["V"]!!.jsonPrimitive.content)
            textInputAnswer = question["reponse"]!!.jsonObject["V"]!!.jsonObject["valeurReponseLibre"]!!.jsonPrimitive.content
        }
    }

    return NewsQuestion(
        id = question["N"]!!.jsonPrimitive.content,
        fullTitle = question["L"]!!.jsonPrimitive.content,
        title = question["titre"]!!.jsonPrimitive.content,
        position = question["rang"]!!.jsonPrimitive.int,
        kind = kind,

        maximumLength = question["tailleReponse"]!!.jsonPrimitive.int,
        shouldRespectMaximumChoices = question["avecMaximum"]!!.jsonPrimitive.boolean,
        maximumChoices = question["nombreReponsesMax"]!!.jsonPrimitive.int,
        content = question["texte"]!!.jsonObject["V"]!!.jsonPrimitive.content,

        attachments = question["listePiecesJointes"]!!.jsonObject["V"]!!.jsonArray.map { decodeAttachment(it.jsonObject, sessionInformation) },

        answerId = question["reponse"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content,
        answered =  answered,

        shouldAnswer = question["reponse"]!!.jsonObject["V"]!!.jsonObject["estReponseAttendue"]!!.jsonPrimitive.boolean,
        answerDate = if (question["reponse"]!!.jsonObject["V"]!!.jsonObject["reponduLe"] != null) decodePronoteDate(question["reponse"]!!.jsonObject["V"]!!.jsonObject["reponduLe"]!!.jsonObject["V"]!!.jsonPrimitive.content) else null,

        choices = if (kind == NewsQuestionKind.TextInput) listOf() else question["listeChoix"]!!.jsonObject["V"]!!.jsonArray.map { decodeNewsQuestionChoice(it.jsonObject) },

        selectedAnswers = selectedAnswers,
        textInputAnswer = textInputAnswer
    )
}