package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.AccountKind
import ink.literate.pawnote.models.InstanceParameters
import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.UserParameters
import kotlinx.serialization.json.*

fun decodeUserParameters(
    parameters: JsonObject,
    sessionInfo: SessionInformation,
    sessionInstance: InstanceParameters
): UserParameters {
  var resources: JsonArray = JsonArray(listOf())

  when (sessionInfo.accountKind) {
    AccountKind.STUDENT -> resources = JsonArray(listOf(parameters["ressource"]!!.jsonObject))
    AccountKind.TEACHER -> resources = JsonArray(listOf(parameters["ressource"]!!.jsonObject))
    AccountKind.PARENT ->
        resources = parameters["ressource"]!!.jsonObject["listeRessources"]!!.jsonArray
  }

  return UserParameters(
      id = parameters["ressource"]!!.jsonObject["N"]!!.jsonPrimitive.content,
      kind = parameters["ressource"]!!.jsonObject["G"]!!.jsonPrimitive.int,
      name = parameters["ressource"]!!.jsonObject["L"]!!.jsonPrimitive.content,
      resources = resources.map { decodeUserResource(it.jsonObject, sessionInfo, sessionInstance) },
      authorizations =
          decodeUserAuthorizations(
              parameters["autorisations"]!!.jsonObject, parameters["listeOnglets"]!!.jsonArray))
}
