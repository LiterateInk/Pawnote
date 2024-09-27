package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.GeolocatedInstance

import haversine
import kotlinx.serialization.json.*

fun decodeGeolocatedInstance (instance: JsonObject, position: Pair<Double, Double>): GeolocatedInstance {
    val latitude = instance["lat"]!!.jsonPrimitive.double
    val longitude = instance["long"]!!.jsonPrimitive.double

    return GeolocatedInstance(
        url = instance["url"]!!.jsonPrimitive.content.lowercase(),
        name = instance["nomEtab"]!!.jsonPrimitive.content
            .trim()
            .replace("COLLEGE", "COLLÈGE")
            .replace("LYCEE", "LYCÉE"),
        latitude = latitude,
        longitude = longitude,
        postalCode = instance["cp"]!!.jsonPrimitive.int.toUInt(),
        distance = haversine(position, Pair(latitude, longitude))
    )
}