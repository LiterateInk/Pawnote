package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonPrimitive
import models.PartnerARDWallet

fun decodePartnerARDWallet (wallet: JsonObject): PartnerARDWallet {
    return PartnerARDWallet(
        name = wallet["libellePorteMonnaie"]!!.jsonPrimitive.content,
        description = wallet["hintPorteMonnaie"]!!.jsonPrimitive.content,
        warning = wallet["avecWarning"]!!.jsonPrimitive.boolean,
        balance = wallet["valeurSolde"]!!.jsonPrimitive.content.replace(",",".").toDouble(),
        balanceDescription = wallet["hintSolde"]!!.jsonPrimitive.content
    )
}