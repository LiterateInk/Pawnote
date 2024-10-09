package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Account
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/** Get more information on the user such email, phone, address and INE if the user is a student. */
fun decodeAccount(account: JsonObject, session: SessionHandle): Account {
  val information = account["Informations"]!!.jsonObject
  var iCalToken: String? = null

  if (session.instance.version[0] >= 2024)
      iCalToken =
          if (account["iCal"] != null)
              account["iCal"]!!
                  .jsonObject["liste"]!!
                  .jsonObject["V"]!!
                  .jsonArray[0]
                  .jsonObject["paramICal"]
                  ?.jsonPrimitive
                  ?.content
          else null

  return Account(
      address =
          listOf(
              information["adresse1"]!!.jsonPrimitive.content,
              information["adresse2"]!!.jsonPrimitive.content,
              information["adresse3"]!!.jsonPrimitive.content,
              information["adresse4"]!!.jsonPrimitive.content),
      postalCode = information["codePostal"]!!.jsonPrimitive.content,
      province = information["province"]!!.jsonPrimitive.content,
      country = information["pays"]!!.jsonPrimitive.content,
      city = information["ville"]!!.jsonPrimitive.content,
      email = information["eMail"]!!.jsonPrimitive.content,
      phone =
          "+${information["indicatifTel"]!!.jsonPrimitive.content}${information["telephonePortable"]!!.jsonPrimitive.content}",
      INE = information["numeroINE"]!!.jsonPrimitive.content,
      iCalToken = iCalToken)
}
