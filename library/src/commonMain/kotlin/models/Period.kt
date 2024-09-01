package models

import kotlinx.datetime.Instant

data class Period(
    val id: String,
    val name: String,
    val kind: Int,
    val startDate: Instant,
    val endDate: Instant
)
