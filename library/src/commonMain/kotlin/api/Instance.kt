package api

import api.helpers.clearURL
import decoders.decodeInstance
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import models.Instance

suspend fun instance (url: String, httpClient: HttpClient = HttpClient()): Instance {
    var cleanedURL = clearURL(url)
    cleanedURL += "/infoMobileApp.json?id=0D264427-EEFC-4810-A9E9-346942A862A4"

    val response = httpClient.get(cleanedURL)
    return decodeInstance(Json.parseToJsonElement(response.bodyAsText()).jsonObject)
}