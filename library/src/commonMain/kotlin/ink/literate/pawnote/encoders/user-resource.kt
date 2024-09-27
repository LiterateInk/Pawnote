package ink.literate.pawnote.encoders

import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import ink.literate.pawnote.models.UserResource

fun encodeUserResource (resource: UserResource) = buildJsonObject {
    put("G", resource.kind)
    put("L", resource.name)
    put("N", resource.id)
}