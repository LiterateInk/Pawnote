import api.helpers.loginCredentials
import kotlinx.coroutines.runBlocking
import models.AccountKind
import models.CredentialsAuth
import kotlin.test.Test

class LoginTest {
    @Test
    fun `credentials login`() {
        val sessionBase = "https://demo.index-education.net/pronote"

        // val sessionBase = "https://dev-instance-pron.papillon.bzh/pronote"

        runBlocking {
            println(loginCredentials(CredentialsAuth(
            url = sessionBase,
            username = "demonstration",
            password = "pronotevs",
            kind = AccountKind.STUDENT,
            deviceUUID = "uuidRandom",
        )))  }

    }
}