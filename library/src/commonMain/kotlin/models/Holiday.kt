package models

import kotlinx.datetime.Instant

data class Holiday(
    val id: String,
    val name: String,
    val startDate: Instant,
    val endDate: Instant
)
