package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.PasswordRules
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodePasswordRules(rules: JsonObject) =
    PasswordRules(
        maxLength = rules["max"]!!.jsonPrimitive.int,
        minLength = rules["min"]!!.jsonPrimitive.int,
        rules = decodeDomain(rules["regles"]!!.jsonObject["V"]!!.jsonPrimitive.content))
