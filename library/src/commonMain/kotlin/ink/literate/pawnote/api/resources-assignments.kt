package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeAssignment
import ink.literate.pawnote.models.Assignment
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

/**
 * Retrieve assignments from a resource.
 */
suspend fun resourceAssignments (session: SessionHandle, resourceID: String): List<Assignment> {
    val request = RequestFN(session.information, "donneesContenusCDT", Json.encodeToString(
        buildJsonObject {
            putJsonObject("_Signature_") {
                put("onglet", TabLocation.Resources.code)
            }

            putJsonObject("donnees") {
                put("pourTAF", true)
                putJsonObject("cahierDeTextes") {
                    put("N", resourceID)
                }
            }
        }
    ))

    val response = request.send()

    return Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject["ListeCahierDeTextes"]!!.jsonObject["V"]!!
        .jsonArray[0].jsonObject["ListeTravailAFaire"]!!.jsonObject["V"]!!
        .jsonArray.map { decodeAssignment(it.jsonObject, session.information) }
}