package ink.literate.pawnote.models

data class Food(
    val name: String,
    val allergens: List<FoodAllergen>,
    val labels: List<FoodLabel>
)