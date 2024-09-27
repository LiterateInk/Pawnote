package ink.literate.pawnote.models.errors

import ink.literate.pawnote.api.private.IdentifyResponse
import ink.literate.pawnote.models.SecurityModal

import kotlinx.serialization.json.JsonObject

class SecurityError (authentication: JsonObject, identity: IdentifyResponse, initialUsername: String? = null) : Exception("You're asked to custom your security methods") {
    val handle: SecurityModal =
        ink.literate.pawnote.decoders.decodeSecurityModal(authentication, identity, initialUsername)
}

class SecuritySourceTooLongError (limit: Int) : Exception("The source name is too long, limited to $limit characters")