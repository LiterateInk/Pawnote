package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.AuthenticationQR

fun decodeAuthenticationQr (qr: JsonObject): AuthenticationQR {
    val url = qr["url"]!!.jsonPrimitive.content

    val kindIndex = url.lastIndexOf("/") + 1
    val base = url.substring(0, kindIndex - 1)
    val kindPath = url.substring(kindIndex)

    return AuthenticationQR(
        kind = decodeAccountKindFromPath(kindPath),
        url = base,
        token = qr["jeton"]!!.jsonPrimitive.content,
        username = qr["login"]!!.jsonPrimitive.content
    )
}