package api

import kotlinx.datetime.toKotlinLocalDateTime
import core.RequestFN
import decoders.decodeWeekMenu
import encoders.encodePronoteDate
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.SessionHandle
import models.TabLocation
import models.WeekMenu
import java.time.LocalDateTime

suspend fun menus (session: SessionHandle, date: kotlinx.datetime.LocalDateTime = LocalDateTime.now().toKotlinLocalDateTime()): WeekMenu {
    val request = RequestFN(session.information, "PageMenus", Json.encodeToString(buildJsonObject {
        putJsonObject("_Signature_") {
            put("onglet", TabLocation.Menus.code)
        }

        putJsonObject("donnees") {
            putJsonObject("date") {
                put("_T", 7)
                put("V", encodePronoteDate(date))
            }
        }
    }))

    val response = request.send()
    return decodeWeekMenu(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject)
}