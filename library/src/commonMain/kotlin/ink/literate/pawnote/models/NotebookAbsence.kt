package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class NotebookAbsence(
    val id: String,

    val startDate: LocalDateTime,
    val endDate: LocalDateTime,

    val justified: Boolean,
    val opened: Boolean,

    val daysMissed: Double,
    val hoursMissed: Int,
    val minutesMissed: Int,

    val shouldParentsJustify: Boolean,
    val administrativelyFixed: Boolean,

    val isReasonUnknown: Boolean,
    val reason: String? = null
)