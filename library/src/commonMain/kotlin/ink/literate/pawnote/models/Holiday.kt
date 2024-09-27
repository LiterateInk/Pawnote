package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class Holiday(
    val id: String,
    val name: String,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime
)