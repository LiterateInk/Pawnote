package api

import decoders.decodeSessionInformation
import encoders.encodeAccountKindToPath
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import models.AccountKind
import models.SessionInformation
import models.errors.BusyPageError
import models.errors.PageUnavailableError
import models.errors.SuspendedIPError

data class SessionInfoParams(
    val base: String,
    val kind: AccountKind,
    val params: Map<String, String>,
    val cookies: List<String>
)

suspend fun sessionInformation(
    options: SessionInfoParams,
    httpClient: HttpClient = HttpClient {followRedirects = false}
): SessionInformation {
    val url = Url(options.base + "/" + encodeAccountKindToPath(options.kind))

    val response = httpClient.get(url) {
        url {
            options.params.forEach { (k, v) -> parameters.append(k, v) }
        }
    }

    val content = response.bodyAsText()

    try {
        val bodyCleaned = content.replace(" ", "").replace("\n", "")
        val from = "Start("
        val to = ")}catch"

        val relaxedData = bodyCleaned.substring(
            bodyCleaned.indexOf(from) + from.length,
            bodyCleaned.indexOf(to)
        )

        val sessionDataString = relaxedData
            .replace(Regex("(['\"])?([a-z0-9A-Z_]+)(['\"])?:"), "\"$2\": ")
            .replace(Regex("'"), "\"")

        return decodeSessionInformation(Json.parseToJsonElement(sessionDataString).jsonObject, options.base)
    }
    catch (err: Exception) {
        if (content.contains("Votre adresse IP est provisoirement suspendue"))
            throw SuspendedIPError()
        else if (content.contains("Le site n'est pas disponible"))
            throw PageUnavailableError()
        else if (content.contains("Le site est momentanément indisponible"))
            throw BusyPageError()

        throw PageUnavailableError()
    }
}