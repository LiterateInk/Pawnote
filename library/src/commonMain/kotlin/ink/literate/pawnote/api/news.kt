package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeNews
import ink.literate.pawnote.encoders.encodeDomain
import ink.literate.pawnote.models.News
import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun news(sessionInformation: SessionInformation): News {
  val request =
      RequestFN(
          sessionInformation,
          "PageActualites",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.News.code) }

                putJsonObject("donnees") {
                  putJsonObject("modesAffActus") {
                    put("_T", 26)
                    put("V", encodeDomain(listOf(0)))
                  }
                }
              }))

  val response = request.send()
  return decodeNews(
      Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, sessionInformation)
}
