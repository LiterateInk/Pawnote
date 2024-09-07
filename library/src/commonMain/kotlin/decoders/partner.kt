package decoders

import kotlinx.serialization.json.JsonObject
import models.Partner

fun decodePartner (partner: JsonObject) = Partner(sso = partner)