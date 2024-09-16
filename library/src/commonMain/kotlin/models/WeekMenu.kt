package models

data class WeekMenu(
    val containsLunch: Boolean,
    val containsDinner: Boolean,

    /**
     * Menu for each day of the week.
     */
    val days: List<Menu>,

    /**
     * Week numbers that are available
     * for the menu.
     */
    val weeks: List<Int>,

    val allergens: List<FoodAllergen>,
    val labels: List<FoodLabel>
)