package api.private

import io.ktor.utils.io.core.*
import models.SessionHandle
import models.SessionInformation

data class Keys(
    val iv: ByteArray,
    val key: ByteArray
)

@OptIn(ExperimentalStdlibApi::class)
fun aesKeys (sessionInfo: SessionInformation, forceEmptyIV: Boolean = false): Keys {
    val iv = (if (forceEmptyIV) "" else sessionInfo.aesIV).hexToByteArray()
    val key = sessionInfo.aesKey.hexToByteArray()

    return Keys(iv = iv, key = key)
}