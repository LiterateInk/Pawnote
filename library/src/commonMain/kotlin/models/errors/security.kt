package models.errors

import api.private.IdentifyResponse
import decoders.decodeSecurityModal
import kotlinx.serialization.json.JsonObject
import models.SecurityModal

class SecurityError (authentication: JsonObject, identity: IdentifyResponse, initialUsername: String? = null) : Exception("You're asked to custom your security methods") {
    val handle: SecurityModal = decodeSecurityModal(authentication, identity, initialUsername)
}

class SecuritySourceTooLongError (limit: Int) : Exception("The source name is too long, limited to $limit characters")