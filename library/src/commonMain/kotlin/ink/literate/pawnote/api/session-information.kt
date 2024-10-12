package ink.literate.pawnote.api

import ink.literate.pawnote.decoders.decodeSessionInformation
import ink.literate.pawnote.encoders.encodeAccountKindToPath
import ink.literate.pawnote.models.AccountKind
import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.errors.BusyPageError
import ink.literate.pawnote.models.errors.PageUnavailableError
import ink.literate.pawnote.models.errors.SuspendedIPError
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject

data class SessionInfoParams(
    val base: String,
    val kind: AccountKind,
    val params: Map<String, String>,
    val cookies: List<Map<String, String>>
)

suspend fun sessionInformation(
  options: SessionInfoParams,
  httpClient: HttpClient = HttpClient { followRedirects = false }
): SessionInformation {
  val url = Url(options.base + "/" + encodeAccountKindToPath(options.kind))

  val response =
      httpClient.get(url) {
        url { options.params.forEach { (k, v) -> parameters.append(k, v) } }
        options.cookies.forEach { cookie(it.keys.first(), it.values.first()) }
      }

  val content = response.bodyAsText()

  try {
    val bodyCleaned = content.replace(" ", "").replace("\n", "")
    val from = "Start("
    val to = ")}catch"

    val relaxedData =
        bodyCleaned.substring(bodyCleaned.indexOf(from) + from.length, bodyCleaned.indexOf(to))

    val sessionDataString =
        relaxedData
            .replace(Regex("(['\"])?([a-z0-9A-Z_]+)(['\"])?:"), "\"$2\": ")
            .replace(Regex("'"), "\"")

    return decodeSessionInformation(
        Json.parseToJsonElement(sessionDataString).jsonObject, options.base)
  } catch (err: Exception) {
    when {
      content.contains("Votre adresse IP est provisoirement suspendue") -> throw SuspendedIPError()
      content.contains("Le site n'est pas disponible") -> throw PageUnavailableError()
      content.contains("Le site est momentanément indisponible") -> throw BusyPageError()
      else -> throw PageUnavailableError()
    }
  }
}
