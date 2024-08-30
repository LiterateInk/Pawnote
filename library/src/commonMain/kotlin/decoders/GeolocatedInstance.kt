package decoders

import haversine
import kotlinx.serialization.json.*
import models.GeolocatedInstance

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