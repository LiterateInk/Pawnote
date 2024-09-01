package core

import api.private.AES
import api.private.Keys
import api.private.aesKeys
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import models.SessionHandle
import java.util.zip.Deflater

actual class Payload actual constructor(
    actual val order: String,
    actual val url: Url
)

data class RequestData(
    val session: Int,
    val numeroOrdre: String,
    val nom: String,
    val donneesSec: String
)

actual class RequestFN actual constructor(
    private val session: SessionHandle,
    actual val name: String,
    actual var data: String
) {
    actual fun process(): Payload {
        this.session.information.order++

        val order = this.generateOrder()
        val url = Url("${this.session.information.url}/appelfonction/${this.session.information.accountKind.code}/${this.session.information.id}/${order}")

        if (!this.session.information.skipCompression)
            this.compress()

        if (!this.session.information.skipEncryption)
            this.encrypt()

        return Payload(order, url)
    }

    private fun keys(): Keys {
        return aesKeys(this.session, this.session.information.order == 1)
    }

    private fun generateOrder(): String {
        val keys = this.keys()
        return AES.encrypt("${this.session.information.order}".toByteArray(), keys.key, keys.iv)
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
        if(!this.session.information.skipCompression)
            this.data = AES.encrypt(this.data.hexToByteArray(), keys.key, keys.iv)
        else
            this.data = AES.encrypt(this.data.toByteArray(), keys.key, keys.iv)
    }

    actual suspend fun send(): ResponseFN {
        val payload = this.process()

        val response = this.session.client.request(payload.url) {
            method = HttpMethod.Post
            contentType(ContentType.Application.Json)
            header("Content-Type", "application/json")
            setBody(RequestData(
                session = session.information.id,
                numeroOrdre = payload.order,
                nom = name,
                donneesSec = data
            ))
        }

        return ResponseFN(this.session, response.bodyAsText())
    }
}