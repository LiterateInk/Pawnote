package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewsQuestionChoice

import kotlinx.serialization.json.*

fun decodeNewsQuestionChoice (choice: JsonObject): NewsQuestionChoice {
    return NewsQuestionChoice(
        value = choice["L"]!!.jsonPrimitive.content,
        position = choice["rang"]!!.jsonPrimitive.int,
        isTextInput = choice["estReponseLibre"]?.jsonPrimitive?.boolean ?: false
    )
}