package ink.literate.pawnote.api.private

import ink.literate.pawnote.api.SessionInfoParams
import ink.literate.pawnote.api.sessionInformation
import kotlinx.coroutines.runBlocking
import ink.literate.pawnote.models.AccountKind
import kotlin.test.Test

class InstanceParametersTest {
    val sessionBase = "https://demo.index-education.net/pronote"
    val sessionId = 1235678

    @Test
    fun `simple request test`() {
        runBlocking {
            println(instanceParameters(sessionInformation(
                SessionInfoParams(
                    base = sessionBase,
                    kind = AccountKind.STUDENT,
                    params = mapOf(
                        "fd" to "1",
                        "login" to "true",
                        "bydlg" to "A6ABB224-12DD-4E31-AD3E-8A39A1C2C335"
                    ),
                    cookies = listOf()
                )
            )))
        }

    }
}