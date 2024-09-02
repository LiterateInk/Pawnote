package models

import kotlinx.datetime.LocalDateTime

data class Period(
    val id: String,
    val name: String,
    val kind: Int,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime
)
