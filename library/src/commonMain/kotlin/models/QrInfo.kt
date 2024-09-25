package models

import kotlinx.serialization.json.JsonObject

data class QrInfo(
    val deviceUUID: String,
    val pin: String,
    val qr: JsonObject,
    val navigatorIdentifier: String? = null
)