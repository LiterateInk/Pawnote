package models

import kotlinx.datetime.LocalDateTime

data class Menu(
    val date: LocalDateTime,
    val lunch: Meal? = null,
    val dinner: Meal? = null
)