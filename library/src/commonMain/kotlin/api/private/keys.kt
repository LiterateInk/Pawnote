package api.private

import io.ktor.utils.io.core.*
import models.SessionHandle
import models.SessionInformation

data class Keys(
    val iv: ByteArray,
    val key: ByteArray
)

fun aesKeys (sessionInfo: SessionInformation, forceEmptyIV: Boolean = false): Keys {
    val iv = (if (forceEmptyIV) "" else sessionInfo.aesIV).toByteArray(Charsets.ISO_8859_1)
    val key = sessionInfo.aesKey.toByteArray()

    return Keys(iv = iv, key = key)
}