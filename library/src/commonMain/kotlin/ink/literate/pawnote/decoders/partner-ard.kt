package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.PartnerARD

import kotlinx.serialization.json.*

fun decodePartnerARD (partner: JsonObject): PartnerARD {
    return PartnerARD(
        sso = decodePartner(partner).sso,
        canRefreshData = partner["avecActualisation"]!!.jsonPrimitive.boolean,
        wallets = partner["porteMonnaie"]!!.jsonObject["V"]!!.jsonArray.map { decodePartnerARDWallet(it.jsonObject) }
    )
}