package models

data class FoodLabel(
    val name: String,

    /**
     * As a hexadecimal color.
     * Example: "#FF3838"
     */
    val color: String
)