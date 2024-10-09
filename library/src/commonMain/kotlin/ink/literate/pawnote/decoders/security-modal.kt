package ink.literate.pawnote.decoders

import ink.literate.pawnote.api.private.IdentifyResponse
import ink.literate.pawnote.models.DoubleAuthClientAction
import ink.literate.pawnote.models.DoubleAuthMode
import ink.literate.pawnote.models.SecurityModal
import ink.literate.pawnote.models.SecurityModalContext
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeSecurityModal(
    authentication: JsonObject,
    identity: IdentifyResponse,
    initialUsername: String? = null
): SecurityModal {
  val actions =
      ink.literate.pawnote.decoders
          .decodeDomain(
              authentication["actionsDoubleAuth"]!!.jsonObject["V"]!!.jsonPrimitive.content)
          .map { DoubleAuthClientAction.fromInt(it) }

  return SecurityModal(
      availableSecurityModes =
          ink.literate.pawnote.decoders
              .decodeDomain(
                  authentication["modesPossibles"]!!.jsonObject["V"]!!.jsonPrimitive.content)
              .map { DoubleAuthMode.fromInt(it) },
      defaultSecurityMode =
          DoubleAuthMode.fromInt(authentication["modeSecurisationParDefaut"]!!.jsonPrimitive.int),
      passwordRules =
          ink.literate.pawnote.decoders.decodePasswordRules(
              authentication["reglesSaisieMDP"]!!.jsonObject),
      shouldCustomPassword =
          actions.contains(DoubleAuthClientAction.AIHMSC_PersonnalisationMotDePasse),
      shouldCustomDoubleAuth = actions.contains(DoubleAuthClientAction.AIHMSC_ChoixStrategie),
      shouldEnterPIN = actions.contains(DoubleAuthClientAction.AIHMSC_SaisieCodePINetSource),
      shouldEnterSource =
          actions.contains(DoubleAuthClientAction.AIHMSC_SaisieSourcePourNotifSeulement),
      context =
          SecurityModalContext(
              authentication = authentication,
              identity = identity,
              initialUsername = initialUsername))
}
