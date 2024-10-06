package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Period
import ink.literate.pawnote.models.Tab
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.json.*

fun decodeTab(tab: JsonObject, instancePeriods: List<Period>): Tab {
  val find: (id: String) -> Period? = { id -> instancePeriods.find { it.id == id } }

  val defaultPeriod =
      if (tab["periodeParDefaut"] != null)
          find(tab["periodeParDefaut"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content)
      else null
  val periods =
      tab["listePeriodes"]!!.jsonObject["V"]!!.jsonArray.mapNotNull {
        if (it.jsonObject["N"] != null) find(it.jsonObject["N"]!!.jsonPrimitive.content) else null
      }

  return Tab(
      defaultPeriod = defaultPeriod,
      location = TabLocation.fromInt(tab["G"]!!.jsonPrimitive.int)!!,
      periods = periods)
}
