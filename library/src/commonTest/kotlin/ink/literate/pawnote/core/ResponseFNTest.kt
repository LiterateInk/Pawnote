package ink.literate.pawnote.core

import ink.literate.pawnote.models.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

class ResponseFNTest {
  val sessionBase = "https://demo.index-education.net/pronote"
  val sessionId = 1235678

  val sessionInfo =
      SessionInformation(
          order = 2,
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
          poll = false)

  @OptIn(ExperimentalSerializationApi::class)
  val rawData = buildJsonObject {
    putJsonObject("donnees") {
      put("number", Json.parseToJsonElement("69"))
      put("nullish", null)
      put("boolean", true)
      put("value", "is a string")
    }
  }

  val encryptedData =
      "e098e0c0e79cdfedc9ade4c7a0a260ffae4f07eac6300ec418f337de878714a876a6750ccfe57134a8e7742ad82e2d7988f012c16035adcdaef9a2e8da57e8fef7f54e131baa656d9a7d126f90ed4213"
  val compressedData =
      "15c6310a80300c05d0ab943f7716cc6d5a0c1a8829348d4be9ddd537bd89a399313b68c2e2aedc41db9ebfab8a5fa03f19b535e562a0d183339ea2c12088a7927c74b1136bbd"
  val encryptedAndCompressedData =
      "6f7857e0328e66707eb973bd0693606016d328b06e81ccf262fce84219389be4e45159fbe930c1f450d37106eb7f51a9d0cc0b8c3f646128fd5bbe102af9dfc6ed8bb06eaf817fbe1f71f692ca02184f"

  val mock: (data: JsonElement) -> String = { data ->
    Json.encodeToString(buildJsonObject { put("donneesSec", data) })
  }

  @Test
  fun `should not decrypt and not decompress`() {
    val sessionInfo = sessionInfo.copy()
    val response = ResponseFN(sessionInfo, mock(rawData))

    assertEquals(Json.encodeToString(rawData), response.data)
  }

  @Test
  fun `should only decrypt`() {
    val sessionInfo = sessionInfo.copy(skipEncryption = false)
    val response = ResponseFN(sessionInfo, mock(Json.parseToJsonElement(encryptedData)))

    assertEquals(Json.encodeToString(rawData), response.data)
  }

  @Test
  fun `should only decompress`() {
    val sessionInfo = sessionInfo.copy(skipCompression = false)
    val response = ResponseFN(sessionInfo, mock(Json.parseToJsonElement(compressedData)))

    assertEquals(Json.encodeToString(rawData), response.data)
  }

  @Test
  fun `should decrypt and decompress`() {
    val sessionInfo = sessionInfo.copy(skipCompression = false, skipEncryption = false)
    val response =
        ResponseFN(sessionInfo, mock(Json.parseToJsonElement(encryptedAndCompressedData)))

    assertEquals(Json.encodeToString(rawData), response.data)
  }
}
