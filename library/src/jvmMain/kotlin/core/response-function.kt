package core

import api.private.AES
import api.private.aesKeys
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.SessionInformation
import models.errors.*
import okio.ByteString.Companion.decodeHex
import java.nio.ByteBuffer
import java.util.zip.Inflater

actual class ResponseFN actual constructor(
    private val sessionInfo: SessionInformation,
    actual var data: String,
) {
    actual var jsonData: JsonElement

    init {
        this.sessionInfo.order++
        val content = data

        try {
            println(this.data)
            this.data = Json.encodeToString(Json.parseToJsonElement(data).jsonObject["donneesSec"]!!)

            if (!this.sessionInfo.skipEncryption) {
                this.decrypt()
            }

            if (!this.sessionInfo.skipCompression) {
                this.decompress()
            }

            this.jsonData = Json.parseToJsonElement(this.data)

            if (this.jsonData.jsonObject.containsKey("_Signature_")
                && this.jsonData.jsonObject["_Signature_"]!!.jsonObject["Erreur"]?.jsonPrimitive?.boolean == true
            )
                throw ServerSideError(this.jsonData.jsonObject["_Signature_"]!!.jsonObject["MessageErreur"]!!.jsonPrimitive.content)
        }
        catch (error: Exception) {
            if (content.contains("La page a expir"))
                throw SessionExpiredError()
            else if (content.contains("Votre adresse IP "))
                throw SuspendedIPError()
            else if (content.contains("La page dem") || content.contains("Impossible d'a"))
                throw PageUnavailableError()
            else if (content.contains("Vous avez d"))
                throw RateLimitedError()

            throw error
        }
    }

    @OptIn(ExperimentalStdlibApi::class)
    private fun decrypt() {
        val keys = aesKeys(this.sessionInfo)
        val iv = keys.iv
        val key = keys.key

        val decryptedData = AES.decrypt(Json.parseToJsonElement(this.data).jsonPrimitive.content.decodeHex().toByteArray(), key, iv)

        if (!this.sessionInfo.skipCompression)
            this.data = decryptedData.toHexString()
        else
            this.data = decryptedData.decodeToString()
    }

    @OptIn(ExperimentalStdlibApi::class)
    private fun decompress() {
        val decompresser = Inflater(true)
        decompresser.setInput(Json.parseToJsonElement(this.data).jsonPrimitive.content.hexToByteArray())

        // Allocate a maximum of 2MB for response data
        val output = ByteBuffer.allocate(2000000)
        val resultLength = decompresser.inflate(output)
        decompresser.end()

        this.data = output.array().copyOfRange(0, resultLength).decodeToString()
    }
}