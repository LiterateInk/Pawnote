package ink.literate.pawnote.models

data class Meal(
    val name: String? = null,
    val entry: List<Food>? = null,
    val main: List<Food>? = null,
    val side: List<Food>? = null,
    val drink: List<Food>? = null,
    val fromage: List<Food>? = null,
    val dessert: List<Food>? = null
)