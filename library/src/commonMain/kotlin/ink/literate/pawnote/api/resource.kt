package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeResource
import ink.literate.pawnote.models.Resource
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun resource(session: SessionHandle, resourceID: String): Resource {
  val request =
      RequestFN(
          session.information,
          "donneesContenusCDT",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Resources.code) }

                putJsonObject("donnees") {
                  putJsonObject("cahierDeTextes") { put("N", resourceID) }
                }
              }))

  val response = request.send()

  val resource =
      Json.parseToJsonElement(response.data)
          .jsonObject["donnees"]!!
          .jsonObject["ListeCahierDeTextes"]!!
          .jsonObject["V"]!!
          .jsonArray[0]
  return decodeResource(resource.jsonObject, session)
}
