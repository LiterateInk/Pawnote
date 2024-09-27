package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.errors.UnreachableError

import kotlinx.serialization.json.*

fun decodeNews (news: JsonObject, sessionInformation: SessionInformation): ink.literate.pawnote.models.News {
    val categories = news["listeCategories"]!!.jsonObject["V"]!!.jsonArray.map { decodeNewsCategory(it.jsonObject) }

    return ink.literate.pawnote.models.News(
        categories = categories,
        items = news["listeModesAff"]!!.jsonArray[0].jsonObject["listeActualites"]!!.jsonObject["V"]!!.jsonArray.map {
            val decoder: (obj: JsonObject) -> Any

            if (it.jsonObject["estInformation"]!!.jsonPrimitive.boolean) decoder =
                { obj -> decodeNewsInformation(obj, sessionInformation) }
            else if (it.jsonObject["estSondage"]!!.jsonPrimitive.boolean) decoder =
                { obj -> decodeNewsSurvey(obj, sessionInformation, categories) }
            else throw UnreachableError("decodeNews")

            decodeNewsItem(it.jsonObject, categories, decoder)
        }
    )
}