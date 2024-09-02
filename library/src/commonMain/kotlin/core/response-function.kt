package core

import kotlinx.serialization.json.JsonElement
import models.SessionHandle
import models.SessionInformation

expect class ResponseFN(sessionInfo: SessionInformation, data: String) {
    var jsonData: JsonElement
    var data: String
}