package api.private

import io.ktor.utils.io.core.*
import models.SessionHandle

data class Keys(
    val iv: ByteArray,
    val key: ByteArray
)

fun aesKeys (session: SessionHandle, forceEmptyIV: Boolean = false): Keys {
    val iv = (if (forceEmptyIV) "" else session.information.aesIV).toByteArray(Charsets.ISO_8859_1)
    val key = session.information.aesKey.toByteArray()

    return Keys(iv = iv, key = key)
}