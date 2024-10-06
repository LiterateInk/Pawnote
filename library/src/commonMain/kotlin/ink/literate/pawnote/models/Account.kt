package ink.literate.pawnote.models

data class Account(
    val address: List<String>,
    val postalCode: String,
    val province: String,
    val country: String,
    val city: String,
    val email: String,
    /** `+[country-code][phone-number]` */
    val phone: String,
    val INE: String,

    /**
     * Only available on instances with PRONOTE version 2024 or higher.
     *
     * iCal feature also requires to be enabled on the instance.
     */
    val iCalToken: String? = null
)
