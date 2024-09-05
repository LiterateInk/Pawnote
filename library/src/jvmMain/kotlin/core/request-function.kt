package core

import api.private.AES
import api.private.Keys
import api.private.aesKeys
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import models.SessionInformation
import java.util.zip.Deflater

actual class Payload actual constructor(
    actual val order: String,
    actual val url: Url
)

actual class RequestFN actual constructor(
    private val sessionInfo: SessionInformation,
    actual val name: String,
    actual var data: String
) {
    actual fun process(): Payload {
        sessionInfo.order++

        val order = this.generateOrder()
        val url = Url("${this.sessionInfo.url}/appelfonction/${this.sessionInfo.accountKind.code}/${this.sessionInfo.id}/${order}")

        if (!this.sessionInfo.skipCompression)
            this.compress()

        if (!this.sessionInfo.skipEncryption)
            this.encrypt()

        return Payload(order, url)
    }

    private fun keys(): Keys {
        return aesKeys(this.sessionInfo, this.sessionInfo.order == 1)
    }

    private fun generateOrder(): String {
        val keys = this.keys()
        return AES.encrypt("${this.sessionInfo.order}".toByteArray(), keys.key, keys.iv)
    }

    @OptIn(ExperimentalStdlibApi::class)
    private fun compress() {
        val input = this.data.toByteArray().toHexString().toByteArray()

        val output = ByteArray(input.size)
        val compressor = Deflater(6, true).apply {
            setInput(input)
            finish()
        }
        val compressedDataLength: Int = compressor.deflate(output)
        this.data = output.copyOfRange(0, compressedDataLength).toHexString()
    }

    @OptIn(ExperimentalStdlibApi::class)
    private fun encrypt() {
        val keys = this.keys()
        println("SHOULD encrypt with key: " + keys.key.toHexString())
        if(!this.sessionInfo.skipCompression)
            this.data = AES.encrypt(this.data.hexToByteArray(), keys.key, keys.iv)
        else
            this.data = AES.encrypt(this.data.toByteArray(), keys.key, keys.iv)
    }

    actual suspend fun send(): ResponseFN {
        println(name)
        val payload = this.process()

        val requestData = buildJsonObject {
            put("session", sessionInfo.id)
            put("numeroOrdre", payload.order)
            put("nom", name)
            put("donneesSec", Json.parseToJsonElement(data))
        }

        println(payload.url)
        println(Json.encodeToString(requestData))


        val response = HttpClient().request(payload.url) {
            method = HttpMethod.Post
            header("Content-Type", "application/json")
            setBody(Json.encodeToString(requestData))
        }

        return ResponseFN(this.sessionInfo, response.bodyAsText())
    }
}