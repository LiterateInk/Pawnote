package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Partner

import kotlinx.serialization.json.JsonObject

fun decodePartner (partner: JsonObject) = Partner(sso = partner)