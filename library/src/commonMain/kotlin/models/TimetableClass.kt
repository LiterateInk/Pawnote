package models

import kotlinx.datetime.LocalDateTime

data class TimetableClass<T>(
    val id: String,
    val backgroundColor: String? = null,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,
    val blockLength: Double,
    val blockPosition: Int,
    val notes: String? = null,
    val weekNumber: Int,
    val data: T
)