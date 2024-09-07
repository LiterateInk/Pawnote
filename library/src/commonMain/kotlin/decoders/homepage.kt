package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.Homepage
import models.HomepageLink
import models.Partner
import models.PartnerARD

fun decodeHomepage (page: JsonObject): Homepage {
    val links: MutableList<HomepageLink> = mutableListOf()

    var partnerTurboself: Partner? = null
    var partnerARD: PartnerARD? = null

    if (page.containsKey("partenaireARD"))
        partnerARD = decodePartnerARD(page["partenaireARD"]!!.jsonObject)

    for (link in page["lienUtile"]!!.jsonObject["listeLiens"]!!.jsonObject["V"]!!.jsonArray) {
        if (link.jsonObject.containsKey("SSO")) {
            if (link.jsonObject["SSO"]!!.jsonObject["codePartenaire"]!!.jsonPrimitive.content == "TURBOSELF")
                partnerTurboself = decodePartner(link.jsonObject)
        } else {
            links.add(decodeHomepageLink(link.jsonObject))
        }
    }

    return Homepage(
        partnerARD = partnerARD,
        partnerTurboself = partnerTurboself,

        links = links
    )
}