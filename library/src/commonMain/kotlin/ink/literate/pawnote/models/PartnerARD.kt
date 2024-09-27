package ink.literate.pawnote.models

import kotlinx.serialization.json.JsonObject

data class PartnerARD(
    val sso: JsonObject,
    val canRefreshData: Boolean,
    val wallets: List<PartnerARDWallet>
)