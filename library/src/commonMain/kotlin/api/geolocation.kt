package api

import decoders.decodeGeolocatedInstance
import io.ktor.client.*
import io.ktor.client.request.forms.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import models.GeolocatedInstance
import models.Position

suspend fun geolocation(position: Position, httpClient: HttpClient = HttpClient()): List<GeolocatedInstance> {
    val res = httpClient.submitForm(
        url = "https://www.index-education.com/swie/geoloc.php",
        formParameters = parameters {
            append("data", "{\"nomFonction\":\"geoLoc\",\"lat\":\"${position.latitude}\",\"long\":\"${position.longitude}\"}")
        }
    )

    val responseContent = res.bodyAsText()

    if (responseContent === "{}") return listOf()

    val instances = Json.parseToJsonElement(responseContent)

    val output: List<GeolocatedInstance> = instances.jsonArray.map { instance ->
        decodeGeolocatedInstance(instance.jsonObject, Pair(position.latitude, position.longitude))
    }

    val comparator = Comparator { a: GeolocatedInstance, b: GeolocatedInstance ->
        when (a.distance > b.distance) {
            true -> 1
            false -> when (a.distance < b.distance) {
                true -> -1
                false -> when (a.name > b.name) {
                    true -> 1
                    false -> when (a.name < b.name) {
                        true -> -1
                        else -> 0
                    }
                }
            }
        }
    }

    return output.sortedWith(comparator)
}