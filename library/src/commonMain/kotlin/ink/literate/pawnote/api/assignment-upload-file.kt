package ink.literate.pawnote.api

import ink.literate.pawnote.api.helpers.createEntityID
import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.core.RequestUpload
import ink.literate.pawnote.models.DocumentKind
import ink.literate.pawnote.models.EntityState
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import ink.literate.pawnote.models.errors.UploadSizeError
import java.io.File
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun assignmentUploadFile(
    session: SessionHandle,
    assignmentID: String,
    file: File,
    fileName: String
) {
  // Check if the file can be uploaded.
  // Otherwise we'll get an error during the upload.

  val fileSize = file.length()
  val maxFileSize = session.user.authorizations.maxAssignmentFileUploadSize

  if (fileSize > maxFileSize) throw UploadSizeError(maxFileSize)

  // Ask to the server to store the file for us.
  val fileUpload = RequestUpload(session, "SaisieTAFARendreEleve", file, fileName)
  fileUpload.send()

  val request =
      RequestFN(
          session.information,
          "SaisieTAFARendreEleve",
          Json.encodeToString(
              buildJsonObject {
                putJsonObject("_Signature_") { put("onglet", TabLocation.Assignments.code) }

                putJsonObject("donnees") {
                  putJsonArray("listeFichiers") {
                    addJsonObject {
                      put("E", EntityState.CREATION.code)
                      put("G", DocumentKind.FILE.code)
                      put("L", fileName)
                      put("N", createEntityID())
                      put("idFichier", fileUpload.id)
                      putJsonObject("TAF") { put("N", assignmentID) }
                    }
                  }
                }
              }))

  request.send()
}
