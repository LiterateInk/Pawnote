package decoders

import kotlinx.serialization.json.*
import models.PartnerARD

fun decodePartnerARD (partner: JsonObject): PartnerARD {
    return PartnerARD(
        sso = decodePartner(partner).sso,
        canRefreshData = partner["avecActualisation"]!!.jsonPrimitive.boolean,
        wallets = partner["porteMonnaie"]!!.jsonObject["V"]!!.jsonArray.map { decodePartnerARDWallet(it.jsonObject) }
    )
}