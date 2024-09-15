package api

import core.RequestFN
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.EntityState
import models.SessionHandle
import models.TabLocation

suspend fun assignmentStatus (session: SessionHandle, assignmentID: String, done: Boolean) {
    val request = RequestFN(session.information, "SaisieTAFFaitEleve", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Assignments.code)
        }

        putJsonObject("donnees") {
            putJsonArray("listeTAF") {
                addJsonObject {
                    put("E", EntityState.MODIFICATION.code)
                    put("TAFFait", done)
                    put("N", assignmentID)
                }
            }
        }
    }))

    request.send()
}