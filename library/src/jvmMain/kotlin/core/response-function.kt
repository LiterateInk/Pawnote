package core

import api.private.AES
import api.private.aesKeys
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.SessionHandle
import models.errors.*
import okio.ByteString.Companion.decodeHex
import java.util.zip.Inflater

actual class ResponseFN actual constructor(
    private val session: SessionHandle,
    actual var data: String,
) {
    actual var jsonData: JsonElement

    init {
        this.session.information.order++
        val content = data

        try {
            this.data = Json.encodeToString(Json.parseToJsonElement(data).jsonObject["donneesSec"]!!)

            if (!this.session.information.skipEncryption) {
                this.decrypt()
            }

            if (!this.session.information.skipCompression) {
                this.decompress()
            }

            this.jsonData = Json.parseToJsonElement(this.data)

            if (this.jsonData.jsonObject.containsKey("_Signature_")
                && this.jsonData.jsonObject["_Signature_"]!!.jsonObject["Erreur"]!!.jsonPrimitive.boolean)
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
        val keys = aesKeys(this.session)
        val iv = keys.iv
        val key = keys.key

        val decryptedData = AES.decrypt(Json.parseToJsonElement(this.data).jsonPrimitive.content.decodeHex().toByteArray(), key, iv)

        if (!this.session.information.skipCompression)
            this.data = decryptedData.toHexString()
        else
            this.data = decryptedData.decodeToString()
    }

    @OptIn(ExperimentalStdlibApi::class)
    private fun decompress() {
        val decompresser = Inflater(true)
        decompresser.setInput(Json.parseToJsonElement(this.data).jsonPrimitive.content.hexToByteArray())

        val output = ByteArray(10000)
        val resultLength = decompresser.inflate(output)
        decompresser.end()

        this.data = output.copyOfRange(0, resultLength).decodeToString()
    }
}