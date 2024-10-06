package ink.literate.pawnote.api.private

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeInstanceParameters
import ink.literate.pawnote.models.InstanceParameters
import ink.literate.pawnote.models.SessionInformation
import java.math.BigInteger
import java.security.KeyFactory
import java.security.spec.RSAPublicKeySpec
import javax.crypto.Cipher
import kotlin.io.encoding.Base64
import kotlin.io.encoding.ExperimentalEncodingApi
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

@OptIn(ExperimentalEncodingApi::class, ExperimentalStdlibApi::class)
actual suspend fun instanceParameters(
    sessionInfo: SessionInformation,
    navigatorIdentifier: String?
): InstanceParameters {
  val modulus = BigInteger(sessionInfo.rsaModulus, 16)
  val exponent = BigInteger(sessionInfo.rsaExponent, 16)

  val pubKeySpec = RSAPublicKeySpec(modulus, exponent)
  val pubKey = KeyFactory.getInstance("RSA").generatePublic(pubKeySpec)

  val aesIV = sessionInfo.aesIV
  val uuid: String

  val cipher = Cipher.getInstance("RSA")
  cipher.init(Cipher.ENCRYPT_MODE, pubKey)

  uuid =
      if (sessionInfo.rsaFromConstants)
          Base64.encode(
              if (sessionInfo.http) cipher.doFinal(aesIV.hexToByteArray())
              else aesIV.hexToByteArray())
      else Base64.encode(cipher.doFinal(aesIV.hexToByteArray()))

  val requestData = buildJsonObject {
    putJsonObject("donnees") {
      put("identifiantNav", navigatorIdentifier)
      put("Uuid", Json.parseToJsonElement(uuid))
    }
  }

  val request = RequestFN(sessionInfo, "FonctionParametres", Json.encodeToString(requestData))
  val response = request.send()

  return decodeInstanceParameters(
      Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject)
}
