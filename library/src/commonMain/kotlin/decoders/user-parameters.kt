package decoders

import kotlinx.serialization.json.*
import models.AccountKind
import models.InstanceParameters
import models.SessionInformation
import models.UserParameters

fun decodeUserParameters (parameters: JsonObject, sessionInfo: SessionInformation, sessionInstance: InstanceParameters): UserParameters {
    var resources: JsonArray = JsonArray(listOf())
    println(parameters) // TODO

    when (sessionInfo.accountKind) {
        AccountKind.STUDENT -> {}
        AccountKind.TEACHER -> resources = JsonArray(listOf( parameters["ressource"]!!.jsonObject))
        AccountKind.PARENT -> resources = parameters["ressource"]!!.jsonObject["listeRessources"]!!.jsonArray
    }

    return UserParameters(
        id = parameters["ressource"]!!.jsonObject["N"]!!.jsonPrimitive.content,
        kind = parameters["ressource"]!!.jsonObject["G"]!!.jsonPrimitive.int,
        name = parameters["ressource"]!!.jsonObject["L"]!!.jsonPrimitive.content,
        resources = resources.map { decodeUserResource(it.jsonObject, sessionInfo, sessionInstance) },
        authorizations = decodeUserAuthorizations(parameters["autorisations"]!!.jsonObject, parameters["listeOnglets"]!!.jsonArray)
    )
}