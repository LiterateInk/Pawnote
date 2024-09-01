package core

import kotlinx.serialization.json.JsonElement
import models.SessionHandle

expect class ResponseFN(session: SessionHandle, data: String) {
    var jsonData: JsonElement
    var data: String
}