package encoders

import kotlinx.datetime.LocalDateTime

/**
 * @returns A string formatted as `$d/$m/$yyyy $H:$M:$S`.
 */

fun encodePronoteDate (date: LocalDateTime): String {
    val day = date.dayOfMonth
    val month = date.month.value
    val year = date.year

    val hours = date.hour
    val minutes = date.minute
    val seconds = date.second

    return "$day/$month/$year $hours:$minutes:$seconds"
}