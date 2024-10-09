package ink.literate.pawnote.api.private

expect class AES {
  companion object {
    fun decrypt(data: ByteArray, key: ByteArray, iv: ByteArray): ByteArray

    fun encrypt(data: ByteArray, key: ByteArray, iv: ByteArray): String
  }
}
