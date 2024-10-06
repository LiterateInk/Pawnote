package ink.literate.pawnote.models

data class Homepage(
    val partnerARD: PartnerARD? = null,
    // NOTE: Not sure if we can have more data about Turboself than just SSO.
    val partnerTurboself: Partner? = null,
    val links: List<HomepageLink>
)
