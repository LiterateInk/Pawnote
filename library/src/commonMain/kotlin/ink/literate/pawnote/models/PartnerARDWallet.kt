package ink.literate.pawnote.models

data class PartnerARDWallet(
    val name: String,
    val description: String,
    val warning: Boolean,
    val balance: Double,
    val balanceDescription: String
)