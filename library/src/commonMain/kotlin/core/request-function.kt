package core

import io.ktor.http.*
import models.SessionInformation

expect class Payload(order: String, url: Url) {
    val order: String
    val url: Url
}

expect class RequestFN(sessionInfo: SessionInformation, name: String, data: String) {
    suspend fun send(): ResponseFN
    fun process(): Payload
    val name: String
    var data: String
}