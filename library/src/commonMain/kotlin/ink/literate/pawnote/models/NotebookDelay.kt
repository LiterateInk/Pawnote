package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class NotebookDelay(
    val id: String,
    val date: LocalDateTime,
    val minutes: Int,
    val justified: Boolean,
    val justification: String? = null,
    val shouldParentsJustify: Boolean,
    val administrativelyFixed: Boolean,
    val isReasonUnknown: Boolean,
    val reason: String? = null
)