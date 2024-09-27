package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class InstanceParameters(
    val nextBusinessDay: LocalDateTime,
    val firstMonday: LocalDateTime,
    val firstDate: LocalDateTime,
    val lastDate: LocalDateTime,

    /**
     * Allows to recognize the device for next authentications.
     */
    val navigatorIdentifier: String? = null,
    val version: List<Int>,
    val endings: List<String>,
    val periods: List<Period>,
    val holidays: List<Holiday>,
    val weekFrequencies: Map<Int, WeekFrequency>,
    val blocksPerDay: Int
)