package decoders

import kotlinx.datetime.Instant
import kotlinx.serialization.json.*
import models.Instance
import models.InstanceAccount

fun decodeInstance(instance: JsonObject): Instance {
    var casURL: String? = null
    var casToken: String? = null

    if (instance["CAS"]!!.jsonObject["actif"]!!.jsonPrimitive.boolean) {
        casURL = instance["CAS"]!!.jsonObject["casURL"]!!.jsonPrimitive.content
        casToken = instance["CAS"]!!.jsonObject["jetonCAS"]!!.jsonPrimitive.content
    }

    return Instance(
        name = instance["nomEtab"]!!.jsonPrimitive.content,
        version = instance["version"]!!.jsonArray.map {version -> version.jsonPrimitive.int},
        date = Instant.parse(instance["date"]!!.jsonPrimitive.content),
        accounts = instance["espaces"]!!.jsonArray.map {account -> InstanceAccount(
            name = account.jsonObject["nom"]!!.jsonPrimitive.content,
            path = account.jsonObject["URL"]!!.jsonPrimitive.content
        ) },
        casURL = casURL,
        casToken = casToken
    )
}