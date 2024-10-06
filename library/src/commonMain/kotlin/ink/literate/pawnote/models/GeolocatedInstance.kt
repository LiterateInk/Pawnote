package ink.literate.pawnote.models

import kotlinx.serialization.Serializable

@Serializable
data class GeolocatedInstance(
    val url: String,
    val name: String,
    val latitude: Double,
    val longitude: Double,
    val postalCode: UInt,
    val distance: Double
)
