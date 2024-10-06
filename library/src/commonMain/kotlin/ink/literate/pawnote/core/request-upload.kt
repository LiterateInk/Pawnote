package ink.literate.pawnote.core

import ink.literate.pawnote.api.private.AES
import ink.literate.pawnote.api.private.aesKeys
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.errors.UploadFailedError
import io.ktor.client.request.*
import io.ktor.client.request.forms.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.util.*
import io.ktor.utils.io.*
import java.io.File
import java.nio.file.Files
import kotlinx.datetime.Clock
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

@OptIn(InternalAPI::class)
class RequestUpload(
    private val session: SessionHandle,
    functionName: String,
    file: File,
    private val fileName: String
) {
  val id = "selecfile_1_${Clock.System.now().toEpochMilliseconds()}"
  var order: String = ""

  private var url = ""
  private var form: List<PartData>? = null

  init {
    session.information.order++

    val keys = aesKeys(session.information)

    order = AES.encrypt(session.information.order.toString().toByteArray(), keys.key, keys.iv)

    val form = formData {
      append("\"numeroOrdre\"", order)
      append("\"numeroSession\"", session.information.id.toString())
      append("\"nomRequete\"", functionName)
      append("\"idFichier\"", id)
      append("\"md5\"", "")
      append(
          "\"files[]\"",
          file.readBytes(),
          Headers.build {
            append(HttpHeaders.ContentDisposition, "filename=\"${fileName}\"")
            append(HttpHeaders.ContentType, Files.probeContentType(file.toPath()))
          })
    }

    this.form = form
    this.url =
        session.information.url +
            "/uploadfilesession/${session.information.accountKind.code}/${session.information.id}"
  }

  suspend fun send() {
    var state = 3

    val url = this.url

    while (state == 3) {
      val response =
          this.session.client.submitFormWithBinaryData(url = url, form!!) {
            headers {
              append(HttpHeaders.ContentDisposition, "attachment; filename=\"${fileName}\"")
            }
          }

      val json = Json.parseToJsonElement(response.content.readUTF8Line()!!)
      state = json.jsonObject["etat"]!!.jsonPrimitive.int
    }

    // Even if there's an error, it bumped.
    this.session.information.order++

    if (state == 0 || state == 2) throw UploadFailedError()
  }
}
