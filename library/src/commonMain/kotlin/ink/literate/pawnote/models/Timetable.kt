package ink.literate.pawnote.models

import kotlinx.serialization.json.JsonObject

data class Timetable(
    var classes: List<TimetableClass<Any>>,
    val absences: JsonObject? = null, // TODO
    val withCanceledClasses: Boolean
)
