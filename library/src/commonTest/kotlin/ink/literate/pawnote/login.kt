package ink.literate.pawnote

import ink.literate.pawnote.api.helpers.loginCredentials
import kotlinx.coroutines.runBlocking
import ink.literate.pawnote.models.AccountKind
import ink.literate.pawnote.models.CredentialsAuth
import kotlin.test.Test

class LoginTest {
    @Test
    fun `credentials login`() {
        // val sessionBase = "https://demo.index-education.net/pronote"

        val sessionBase = "https://dev-instance-pron.papillon.bzh/pronote"

        runBlocking {
            println(loginCredentials(CredentialsAuth(
            url = sessionBase,
            username = "demonstration",
            password = "12345678",
            kind = AccountKind.STUDENT,
            deviceUUID = "uuidRandom",
        )))  }

    }
}