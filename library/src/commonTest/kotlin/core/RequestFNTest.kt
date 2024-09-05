package core

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonObject
import models.*
import kotlin.test.Test
import kotlin.test.assertEquals

class RequestFNTest {
    val sessionBase = "https://demo.index-education.net/pronote"
    val sessionId = 1235678

    val sessionInfo = SessionInformation(
        order = 0,
        url = sessionBase,
        id = sessionId,
        accountKind = AccountKind.STUDENT,
        aesIV = "09666dfddd5bbdacc8bb446df87530303130",
        aesKey = "",
        skipCompression = true,
        skipEncryption = true,
        demo = true,
        accessKind = SessionAccessKind.ACCOUNT,
        rsaModulus = "",
        rsaExponent = "",
        rsaFromConstants = true,
        http = false,
        poll = false
    )

    val requestName = "any name to fill the void."
    @OptIn(ExperimentalSerializationApi::class)
    val requestData = buildJsonObject {
        putJsonObject("donnees") {
            put("number", Json.parseToJsonElement("69"))
            put("nullish", null)
            put("boolean", true)
            put("value", "is a string")
        }
    }
    @Test
    fun `test URLs`() {
        val sessionInfo = sessionInfo.copy()
        var request = RequestFN(sessionInfo, requestName, requestData.toString())

        assertEquals(sessionBase + "/appelfonction/6/" + sessionId + "/3fa959b13967e0ef176069e01e23c8d7",
            request.process().url.toString())

        sessionInfo.order++

        request = RequestFN(sessionInfo, requestName, requestData.toString())

        assertEquals(sessionBase + "/appelfonction/6/" + sessionId + "/7c1f9564ba825ab3d87d6dc965105db7",
            request.process().url.toString())
    }

    @Test
    fun `should not encrypt and not compress`() {
        val sessionInfo = sessionInfo.copy()
        val request = RequestFN(sessionInfo, requestName, requestData.toString())
        assertEquals(requestData.toString(), request.data)
    }

    @Test
    fun `should compress only`() {
        val sessionInfo = sessionInfo.copy(skipCompression = false)
        val request = RequestFN(sessionInfo, requestName, requestData.toString())
        request.process()

        assertEquals("358ed1118030084357d220891d47dbbaff08869e1e5f798f0be80678f0e1f4245301c4a5a253c94198a158301afac7bba7297896f9c9b270d7e394dc3957d721d86759d1b4af64e36d7760e38e4d517b6cfec2e734345e",
            request.data)
    }

    @Test
    fun `should encrypt only`() {
        val sessionInfo = sessionInfo.copy(skipEncryption = false)
        val request = RequestFN(sessionInfo, requestName, Json.encodeToString(requestData))
        request.process()

        assertEquals("4c859cd38ec673c7466130ca9b064bf7116950339c5f11b7c30b1d72191a7b29d60fc44c2a9c19751979ccb12785cd9d8178356f4d1a4a3c8e2172b90f795e1b5fff0003042ea2d790028021ce3f0666",
            request.data)
    }

    @Test
    fun `should compress and encrypt`() {
        val sessionInfo = sessionInfo.copy(skipCompression = false, skipEncryption = false)
        var request = RequestFN(sessionInfo, requestName, Json.encodeToString(requestData))
        request.process()

        assertEquals("ab7a186a6a76ea9e78a65a0930c001cfd112c8b36da16b0bd6817295c83d1e48396c4ec34955ae8142270519dcd631019e214af5cb135fa961ea0cefdd833afd04c25b0b3a9b6cccf6c2dbad7f5904edec3a2b095952cf8513e9a35ae6e1b7fe",
            request.data)

        sessionInfo.order++

        request = RequestFN(sessionInfo, requestName, Json.encodeToString(requestData))
        request.process()

        assertEquals("fc5edbd03c4b614c467e8da07008071c575b433aeba4d519c7885f567b68356335c998842d1ba65a687e705618f4d1bfc5f9165a46fc84f0c98a21380478bbbad607cca5fc7111388f237487bc6bea120d347e555b9a990c19f096de38bdab01",
            request.data)

    }
}