package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import models.Attachment
import models.SessionInformation

expect fun decodeAttachment(
    attachment: JsonObject,
    sessionInfo: SessionInformation,
    parameters: JsonObject = buildJsonObject {  }
): Attachment