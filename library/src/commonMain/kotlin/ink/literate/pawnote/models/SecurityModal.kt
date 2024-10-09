package ink.literate.pawnote.models

import ink.literate.pawnote.api.private.IdentifyResponse
import kotlinx.serialization.json.JsonObject

data class SecurityModalContext(
    var authentication: JsonObject,
    val identity: IdentifyResponse,
    val initialUsername: String? = null
)

data class SecurityModal(
    val availableSecurityModes: List<DoubleAuthMode>,
    val defaultSecurityMode: DoubleAuthMode,
    val passwordRules: PasswordRules,
    val shouldCustomPassword: Boolean,
    val shouldCustomDoubleAuth: Boolean,
    val shouldEnterPIN: Boolean,
    val shouldEnterSource: Boolean,

    /** Should be internal use only. */
    val context: SecurityModalContext
)
