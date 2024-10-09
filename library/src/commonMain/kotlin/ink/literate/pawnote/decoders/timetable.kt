package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.InstanceParameters
import ink.literate.pawnote.models.Timetable
import kotlinx.serialization.json.*

val isTimetableClassActivity: (item: JsonObject) -> Boolean = { item ->
  item.containsKey("estSortiePedagogique") && item["estSortiePedagogique"]!!.jsonPrimitive.boolean
}
val isTimetableClassDetention: (item: JsonObject) -> Boolean = { item ->
  item.containsKey("estRetenue") && item["estRetenue"]!!.jsonPrimitive.content != "undefined"
}

fun decodeTimetable(timetable: JsonObject, sessionInstance: InstanceParameters) =
    Timetable(
        absences = timetable["absences"]!!.jsonObject,
        withCanceledClasses = timetable["avecCoursAnnule"]?.jsonPrimitive?.boolean ?: true,
        classes =
            timetable["ListeCours"]!!.jsonArray.map { item ->
              val itemObj = item.jsonObject

              val decoder: (item: JsonObject) -> Any =
                  if (isTimetableClassActivity(itemObj)) {
                    { decodeTimetableClassActivity(itemObj) }
                  } else if (isTimetableClassDetention(itemObj)) {
                    { decodeTimetableClassDetention(itemObj) }
                  } else {
                    { decodeTimetableClassLesson(itemObj) }
                  }

              decodeTimetableClass(itemObj, sessionInstance, decoder)
            })
