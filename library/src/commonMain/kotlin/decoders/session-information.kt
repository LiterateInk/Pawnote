package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonPrimitive
import models.AccountKind
import models.SessionAccessKind
import models.SessionInformation
import kotlin.random.Random

const val rsaModulo1024 = "B99B77A3D72D3A29B4271FC7B7300E2F791EB8948174BE7B8024667E915446D4EEA0C2424B8D1EBF7E2DDFF94691C6E994E839225C627D140A8F1146D1B0B5F18A09BBD3D8F421CA1E3E4796B301EEBCCF80D81A32A1580121B8294433C38377083C5517D5921E8A078CDC019B15775292EFDA2C30251B1CCABE812386C893E5"
const val rsaExponent1024 = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"

@OptIn(ExperimentalStdlibApi::class)
fun decodeSessionInformation(
    session: JsonObject,
    base: String
): SessionInformation {
    val rsaFromConstants = session["MR"] == null && session["ER"] == null

    return SessionInformation(
        url = base,

        id = session["h"]!!.jsonPrimitive.content.toInt(),
        accountKind = AccountKind.fromInt(session["a"]!!.jsonPrimitive.int),
        demo = session["d"]?.jsonPrimitive?.boolean ?: false,
        accessKind = if(session["g"] != null) SessionAccessKind.fromInt(session["g"]!!.jsonPrimitive.int) else SessionAccessKind.ACCOUNT,

        rsaModulus = if (rsaFromConstants) rsaModulo1024 else session["MR"]!!.jsonPrimitive.content,
        rsaExponent = if (rsaFromConstants) rsaExponent1024 else session["ER"]!!.jsonPrimitive.content,
        rsaFromConstants = rsaFromConstants,

        aesIV = Random.nextBytes(16).toHexString(),
        aesKey = "",

        skipEncryption = session["sCrA"]?.jsonPrimitive?.boolean ?: false,
        skipCompression = session["sCoA"]?.jsonPrimitive?.boolean ?: false,
        http = session["http"]?.jsonPrimitive?.boolean ?: false,
        poll = session["poll"]?.jsonPrimitive?.boolean ?: false,
        order = 0
    )
}