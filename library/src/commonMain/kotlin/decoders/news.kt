package decoders

import kotlinx.serialization.json.*
import models.News
import models.SessionInformation
import models.errors.UnreachableError

fun decodeNews (news: JsonObject, sessionInformation: SessionInformation): News {
    val categories = news["listeCategories"]!!.jsonObject["V"]!!.jsonArray.map { decodeNewsCategory(it.jsonObject) }

    return News(
        categories = categories,
        items = news["listeModesAff"]!!.jsonArray[0].jsonObject["listeActualites"]!!.jsonObject["V"]!!.jsonArray.map {
            val decoder: (obj: JsonObject) -> Any

            if (it.jsonObject["estInformation"]!!.jsonPrimitive.boolean) decoder = {obj -> decodeNewsInformation(obj, sessionInformation) }
            else if (it.jsonObject["estSondage"]!!.jsonPrimitive.boolean) decoder = {obj -> decodeNewsSurvey(obj, sessionInformation, categories) }
            else throw UnreachableError("decodeNews")

            decodeNewsItem(it.jsonObject, categories, decoder)
        }
    )
}