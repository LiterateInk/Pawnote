package models

import kotlinx.datetime.Instant

data class InstanceParameters(
    val nextBusinessDay: Instant,
    val firstMonday: Instant,
    val firstDate: Instant,
    val lastDate: Instant,

    val version: List<Int>,
    val endings: List<String>,
    val periods: List<Period>,
    val holidays: List<Holiday>,
    val weekFrequencies: Map<Int, WeekFrequency>,
    val blocksPerDay: Int
)
