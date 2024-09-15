package api.private

import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.buildJsonObject

fun propertyCaseInsensitive (prop: String, value: JsonElement) = buildJsonObject {
    put(prop, value)
    put(prop[0].uppercase() + prop.substring(1), value)
}