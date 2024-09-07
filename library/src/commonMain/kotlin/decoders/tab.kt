package decoders

import kotlinx.serialization.json.*
import models.Period
import models.Tab
import models.TabLocation

fun decodeTab (tab: JsonObject, instancePeriods: List<Period>): Tab {
    val find: (id: String) -> Period? = {id -> instancePeriods.find { it.id == id }}

    val defaultPeriod = if(tab["periodeParDefaut"] != null) find(tab["periodeParDefaut"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content) else null
    val periods = tab["listePeriodes"]!!.jsonObject["V"]!!.jsonArray.map { find(it.jsonObject["N"]!!.jsonPrimitive.content) }.filterNotNull()

    return Tab(
        defaultPeriod = defaultPeriod,
        location = TabLocation.fromInt(tab["G"]!!.jsonPrimitive.int)!!,
        periods = periods
    )
}