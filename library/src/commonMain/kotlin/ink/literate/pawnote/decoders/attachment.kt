package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Attachment
import ink.literate.pawnote.models.SessionInformation

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject

expect fun decodeAttachment(
    attachment: JsonObject,
    sessionInfo: SessionInformation,
    parameters: JsonObject = buildJsonObject {  }
): Attachment