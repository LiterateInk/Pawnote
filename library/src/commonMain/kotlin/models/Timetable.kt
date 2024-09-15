package models

import kotlinx.serialization.json.JsonObject

data class Timetable(
    val classes: List<TimetableClass<Any>>,
    val absences: JsonObject? = null, // TODO
    val withCanceledClasses: Boolean
)
