package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.models.EntityState
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

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