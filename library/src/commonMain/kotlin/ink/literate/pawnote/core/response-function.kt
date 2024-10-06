package ink.literate.pawnote.core

import ink.literate.pawnote.models.SessionInformation
import kotlinx.serialization.json.JsonElement

expect class ResponseFN(sessionInfo: SessionInformation, data: String) {
  var jsonData: JsonElement
  var data: String
}
