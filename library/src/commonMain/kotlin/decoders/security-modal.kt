package decoders

import api.private.IdentifyResponse
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.DoubleAuthClientAction
import models.DoubleAuthMode
import models.SecurityModal
import models.SecurityModalContext

fun decodeSecurityModal (authentication: JsonObject, identity: IdentifyResponse, initialUsername: String? = null): SecurityModal {
    val actions = decodeDomain(authentication["actionsDoubleAuth"]!!.jsonObject["V"]!!.jsonPrimitive.content).map { DoubleAuthClientAction.fromInt(it) }

    return SecurityModal(
        availableSecurityModes = decodeDomain(authentication["modesPossibles"]!!.jsonObject["V"]!!.jsonPrimitive.content).map { DoubleAuthMode.fromInt(it) },
        defaultSecurityMode = DoubleAuthMode.fromInt(authentication["modeSecurisationParDefaut"]!!.jsonPrimitive.int),
        passwordRules = decodePasswordRules(authentication["reglesSaisieMDP"]!!.jsonObject),

        shouldCustomPassword = actions.contains(DoubleAuthClientAction.AIHMSC_PersonnalisationMotDePasse),
        shouldCustomDoubleAuth = actions.contains(DoubleAuthClientAction.AIHMSC_ChoixStrategie),

        shouldEnterPIN = actions.contains(DoubleAuthClientAction.AIHMSC_SaisieCodePINetSource),
        shouldEnterSource = actions.contains(DoubleAuthClientAction.AIHMSC_SaisieSourcePourNotifSeulement),

        context = SecurityModalContext(
            authentication = authentication,
            identity = identity,
            initialUsername = initialUsername
        )
    )
}