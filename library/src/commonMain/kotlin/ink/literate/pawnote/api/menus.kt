package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeWeekMenu
import ink.literate.pawnote.encoders.encodePronoteDate
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import ink.literate.pawnote.models.WeekMenu

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import kotlinx.datetime.toKotlinLocalDateTime
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