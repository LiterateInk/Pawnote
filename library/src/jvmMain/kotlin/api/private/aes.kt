package api.private

import java.security.MessageDigest
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

actual class AES {
    actual companion object {
        actual fun decrypt(data: ByteArray, key: ByteArray, iv: ByteArray) : ByteArray {
            val finalKey = MessageDigest.getInstance("MD5").digest(key)
            val finalIv: ByteArray = when (iv.isNotEmpty()) {
                true -> {
                    MessageDigest.getInstance("MD5").digest(iv)
                }

                false -> {
                    ByteArray(16) { 0 }
                }
            }

            val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")

            cipher.init(Cipher.DECRYPT_MODE, SecretKeySpec(finalKey, "AES"), IvParameterSpec(finalIv))

            return cipher.doFinal(data)
        }

        @OptIn(ExperimentalStdlibApi::class)
        actual fun encrypt(data: ByteArray, key: ByteArray, iv: ByteArray): String {
            val finalKey = MessageDigest.getInstance("MD5").digest(key)
            val finalIv: ByteArray = when (iv.isNotEmpty()) {
                true -> {
                    MessageDigest.getInstance("MD5").digest(iv)
                }

                false -> {
                    ByteArray(16) { 0 }
                }
            }

            val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")

            cipher.init(Cipher.ENCRYPT_MODE, SecretKeySpec(finalKey, "AES"), IvParameterSpec(finalIv))

            return cipher.doFinal(data).toHexString()
        }
    }
}