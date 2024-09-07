package api.helpers

import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toInstant
import kotlin.math.floor

fun translateToWeekNumber (dateToTranslate: LocalDateTime, startDay: LocalDateTime): Int {
    val daysDiff = (dateToTranslate.toInstant(TimeZone.UTC) - startDay.toInstant(TimeZone.UTC)).inWholeDays
    return 1 + floor(daysDiff.toDouble() / 7).toInt()
}