package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Instance
import ink.literate.pawnote.models.InstanceAccount
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.json.*

fun decodeInstance(instance: JsonObject): Instance {
  var casURL: String? = null
  var casToken: String? = null

  if (instance["CAS"]!!.jsonObject["actif"]!!.jsonPrimitive.boolean) {
    casURL = instance["CAS"]!!.jsonObject["casURL"]!!.jsonPrimitive.content
    casToken = instance["CAS"]!!.jsonObject["jetonCAS"]!!.jsonPrimitive.content
  }

  return Instance(
      name = instance["nomEtab"]!!.jsonPrimitive.content,
      version = instance["version"]!!.jsonArray.map { version -> version.jsonPrimitive.int },
      date = LocalDateTime.parse(instance["date"]!!.jsonPrimitive.content.dropLast(1)),
      accounts =
          instance["espaces"]!!.jsonArray.map { account ->
            InstanceAccount(
                name = account.jsonObject["nom"]!!.jsonPrimitive.content,
                path = account.jsonObject["URL"]!!.jsonPrimitive.content)
          },
      casURL = casURL,
      casToken = casToken)
}
