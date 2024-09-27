package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.errors.UnreachableError

import kotlinx.datetime.*

const val shortDateRe = """^\d{2}\/\d{2}\/\d{4}$"""
const val longDateLongHoursRe = """^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$"""
const val longDateShortHoursRe = """^\d{2}\/\d{2}\/\d{2} \d{2}h\d{2}$"""
val yearFirstTwoChars = Instant.fromEpochMilliseconds(Clock.System.now().toEpochMilliseconds()).toLocalDateTime(TimeZone.currentSystemDefault()).year.toString().slice(0..<2)

fun decodePronoteDate (formatted: String): LocalDateTime {
    if (shortDateRe.toRegex().containsMatchIn(formatted)) {
        val (day, month, year) = formatted.split("/").map { it.toInt() }
        return LocalDateTime(year, month, day, 0, 0)
    }
    else if (longDateLongHoursRe.toRegex().containsMatchIn(formatted)) {
        val (date, time) = formatted.split(" ")
        val (day, month, year) = date.split("/").map { it.toInt() }
        val (hours, minutes, seconds) = time.split(":").map { it.toInt() }

        return LocalDateTime(year, month, day, hours, minutes, seconds)
    }
    else if (longDateShortHoursRe.toRegex().containsMatchIn(formatted)) {
        val (date, time) = formatted.split(" ")
        val (day, month, year) = date.split("/").map { it.toInt() }
        val (hours, minutes) = time.split("h").map { it.toInt() }

        return LocalDateTime("${yearFirstTwoChars}${year}".toInt(), month, day, hours, minutes)
    }

    throw UnreachableError("decodePronoteDate")
}