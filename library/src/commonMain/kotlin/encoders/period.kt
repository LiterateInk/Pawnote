package encoders

import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import models.Period

fun encodePeriod (period: Period) = buildJsonObject {
    put("N", period.id)
    put("G", period.kind)
    put("L", period.name)
}