package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.Timetable
import kotlinx.serialization.json.*

val isTimetableClassActivity: (item: JsonObject) -> Boolean = { item ->
  item.containsKey("estSortiePedagogique") && item["estSortiePedagogique"]!!.jsonPrimitive.boolean
}
val isTimetableClassDetention: (item: JsonObject) -> Boolean = { item ->
  item.containsKey("estRetenue") && item["estRetenue"]!!.jsonPrimitive.content != "undefined"
}

fun decodeTimetable(timetable: JsonObject, session: SessionHandle) =
    Timetable(
        absences = timetable["absences"]!!.jsonObject,
        withCanceledClasses = timetable["avecCoursAnnule"]?.jsonPrimitive?.boolean ?: true,
        classes =
            timetable["ListeCours"]!!.jsonArray.map { item ->
              val itemObj = item.jsonObject

              val decoder: (item: JsonObject) -> Any =
                  if (isTimetableClassActivity(itemObj)) {
                    { decodeTimetableClassActivity(itemObj, session.information) }
                  } else if (isTimetableClassDetention(itemObj)) {
                    { decodeTimetableClassDetention(itemObj) }
                  } else {
                    { decodeTimetableClassLesson(itemObj) }
                  }

              decodeTimetableClass(itemObj, session, decoder)
            })
