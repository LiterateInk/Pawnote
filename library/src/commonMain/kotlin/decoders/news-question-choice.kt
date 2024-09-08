package decoders

import kotlinx.serialization.json.*
import models.NewsQuestionChoice

fun decodeNewsQuestionChoice (choice: JsonObject): NewsQuestionChoice {
    return NewsQuestionChoice(
        value = choice["L"]!!.jsonPrimitive.content,
        position = choice["rang"]!!.jsonPrimitive.int,
        isTextInput = choice["estReponseLibre"]?.jsonPrimitive?.boolean ?: false
    )
}