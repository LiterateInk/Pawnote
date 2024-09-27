package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.*

import kotlinx.serialization.json.*

fun decodeUserResource (resource: JsonObject, sessionInfo: SessionInformation, sessionInstance: InstanceParameters): UserResource {
    var profilePicture: Attachment? = null

    if (resource["avecPhoto"]?.jsonPrimitive?.boolean == true)
        profilePicture = decodeAttachment(buildJsonObject {
            put("G", 1)
            put("N", resource["N"]!!)
            put("L", "photo.jpg")
        }, sessionInfo)

    val tabs: MutableMap<TabLocation, Tab> = mutableMapOf()

    if (resource["listeOngletsPourPeriodes"] != null)
        for (tab in resource["listeOngletsPourPeriodes"]!!.jsonObject["V"]?.jsonArray ?: listOf())
            if (TabLocation.fromInt(tab.jsonObject["G"]!!.jsonPrimitive.int) != null)
                tabs[TabLocation.fromInt(tab.jsonObject["G"]!!.jsonPrimitive.int)!!] =
                    decodeTab(tab.jsonObject, sessionInstance.periods)

    return UserResource(
        id = resource["N"]!!.jsonPrimitive.content,
        kind = resource["G"]!!.jsonPrimitive.int,
        name = resource["L"]!!.jsonPrimitive.content,
        establishmentName = resource["Etablissement"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
        className = if (resource["classeDEleve"] != null) resource["classeDEleve"]!!.jsonObject["L"]!!.jsonPrimitive.content else null,
        profilePicture = profilePicture,
        tabs = tabs,
        isDirector = resource["estDirecteur"]?.jsonPrimitive?.boolean ?: false,
        isDelegate = resource["estDelegue"]?.jsonPrimitive?.boolean ?: false,
        isMemberCA = resource["estMembreCA"]?.jsonPrimitive?.boolean ?: false
    )
}