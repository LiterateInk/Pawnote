package models

import api.private.Queue
import io.ktor.client.*

/**
 * Equivalent of a PRONOTE session.
 * Contains metadata, AES keys, RSA modulus, and more.
 */
data class SessionHandle(
    val serverURL: String,
    var information: SessionInformation,
    var instance: InstanceParameters,
    var user: UserParameters,

    val client: HttpClient = HttpClient()
)