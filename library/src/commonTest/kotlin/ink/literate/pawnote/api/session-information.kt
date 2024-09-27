package ink.literate.pawnote.api

import ink.literate.pawnote.models.AccountKind

import kotlinx.coroutines.runBlocking
import kotlin.test.Test

class SessionInformationTest {
    val sessionBase = "https://demo.index-education.net/pronote"

    @Test
    fun `simple request test`() {
        runBlocking {
            sessionInformation(
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
            )
        }
    }
}