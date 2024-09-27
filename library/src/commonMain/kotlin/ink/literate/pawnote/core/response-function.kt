package ink.literate.pawnote.core

import kotlinx.serialization.json.JsonElement
import ink.literate.pawnote.models.SessionInformation

expect class ResponseFN(sessionInfo: SessionInformation, data: String) {
    var jsonData: JsonElement
    var data: String
}