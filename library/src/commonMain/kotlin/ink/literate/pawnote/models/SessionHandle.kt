package ink.literate.pawnote.models

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
    var userResource: UserResource,

    val client: HttpClient = HttpClient()
)