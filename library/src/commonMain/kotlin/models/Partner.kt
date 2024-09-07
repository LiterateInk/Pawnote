package models

import kotlinx.serialization.json.JsonObject

open class Partner(
    /**
     * Object to send to PRONOTE to login using SSO.
     */
    val sso: JsonObject
)
