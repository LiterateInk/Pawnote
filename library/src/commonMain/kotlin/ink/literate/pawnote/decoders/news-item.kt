package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewsCategory
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun <T> decodeNewsItem(
    item: JsonObject,
    categories: List<NewsCategory>,
    decoder: (obj: JsonObject) -> T
): ink.literate.pawnote.models.NewsItem<T> {
  return ink.literate.pawnote.models.NewsItem(
      id = item["N"]!!.jsonPrimitive.content,
      title = item["L"]!!.jsonPrimitive.content,
      category =
          categories.find {
            it.id == item["categorie"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content
          }!!,
      creationDate =
          decodePronoteDate(item["dateCreation"]!!.jsonObject["V"]!!.jsonPrimitive.content),
      startDate = decodePronoteDate(item["dateDebut"]!!.jsonObject["V"]!!.jsonPrimitive.content),
      endDate = decodePronoteDate(item["dateFin"]!!.jsonObject["V"]!!.jsonPrimitive.content),
      author = item["auteur"]!!.jsonPrimitive.content,
      public = item["public"]!!.jsonObject["V"]!!.jsonObject,
      read = item["lue"]!!.jsonPrimitive.boolean,
      data = decoder(item),
  )
}
