package ink.literate.pawnote.encoders

import ink.literate.pawnote.models.Period
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

fun encodePeriod(period: Period) = buildJsonObject {
  put("N", period.id)
  put("G", period.kind)
  put("L", period.name)
}
