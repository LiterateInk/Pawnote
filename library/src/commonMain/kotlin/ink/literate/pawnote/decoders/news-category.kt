package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewsCategory
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonPrimitive

fun decodeNewsCategory(category: JsonObject): NewsCategory {
  return NewsCategory(
      id = category["N"]!!.jsonPrimitive.content,
      name = category["L"]!!.jsonPrimitive.content,
      default =
          if (category["estDefaut"] != null) category["estDefaut"]!!.jsonPrimitive.boolean
          else false)
}
