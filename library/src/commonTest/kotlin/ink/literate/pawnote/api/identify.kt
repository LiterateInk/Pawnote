package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.IdentifyParameters
import ink.literate.pawnote.api.private.identify
import ink.literate.pawnote.models.*

import kotlinx.coroutines.runBlocking
import kotlin.test.Test

class IdentifyTest {
    val sessionBase = "https://demo.index-education.net/pronote"
    val sessionId = 1235678

    val sessionInfo = SessionInformation(
        order = 0,
        url = sessionBase,
        id = sessionId,
        accountKind = AccountKind.STUDENT,
        aesIV = "\tfmýÝ[½¬È»Dmøu0010",
        aesKey = "",
        skipCompression = false,
        skipEncryption = false,
        demo = true,
        accessKind = SessionAccessKind.ACCOUNT,
        rsaModulus = "",
        rsaExponent = "",
        rsaFromConstants = true,
        http = false,
        poll = false
    )

    @Test
    fun `simple identify`() {
        runBlocking {
            println(identify(sessionInfo, IdentifyParameters(
                requestFirstMobileAuthentication = true,
                reuseMobileAuthentication = false,
                requestFromQRCode = false,
                useCAS = false,
                username = "demo",
                deviceUUID = "coucou"
            )))
        }
    }
}