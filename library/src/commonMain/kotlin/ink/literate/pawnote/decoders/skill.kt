package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Skill
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeSkill(skill: JsonObject) =
    Skill(
        id = skill["N"]!!.jsonPrimitive.content,
        level = skill["L"]!!.jsonPrimitive.content,
        abbreviation = skill["abbreviation"]!!.jsonPrimitive.content,
        coefficient = skill["coefficient"]!!.jsonPrimitive.int,
        domainID = skill["domaine"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content,
        domainName = skill["domaine"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
        itemID =
            if (skill["item"] != null)
                skill["item"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content
            else null,
        itemName =
            if (skill["item"] != null)
                skill["item"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content
            else null,
        order = skill["ordre"]!!.jsonPrimitive.int,
        pillarID = skill["pilier"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content,
        pillarName = skill["pilier"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
        pillarPrefixes =
            skill["pilier"]!!
                .jsonObject["V"]!!
                .jsonObject["strPrefixes"]!!
                .jsonPrimitive
                .content
                .split(',')
                .map { it.trim() })
