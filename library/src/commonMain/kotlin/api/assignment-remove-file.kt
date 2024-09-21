package api

import core.RequestFN
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.EntityState
import models.SessionHandle
import models.TabLocation

suspend fun assignmentRemoveFile (session: SessionHandle, assignmentID: String) {
    val request = RequestFN(session.information, "SaisieTAFARendreEleve", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Assignments.code)
        }

        putJsonObject("donnees") {
            putJsonArray("listeFichiers") {
                addJsonObject {
                    put("E", EntityState.DELETION.code)
                    putJsonObject("TAF") {
                        put("N", assignmentID)
                    }
                }
            }
        }
    }))

    request.send()
}