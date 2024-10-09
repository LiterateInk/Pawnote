package ink.literate.pawnote.encoders

import ink.literate.pawnote.models.UserResource
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

fun encodeUserResource(resource: UserResource) = buildJsonObject {
  put("G", resource.kind)
  put("L", resource.name)
  put("N", resource.id)
}
