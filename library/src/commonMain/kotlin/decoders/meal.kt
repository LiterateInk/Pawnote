package decoders

import kotlinx.serialization.json.*
import models.DishKind
import models.Food
import models.Meal

fun decodeMeal (meal: JsonObject): Meal {
    var entry: List<Food>? = null
    var main: List<Food>? = null
    var side: List<Food>? = null
    var drink: List<Food>? = null
    var fromage: List<Food>? = null
    var dessert: List<Food>? = null

    meal["ListePlats"]!!.jsonObject["V"]!!.jsonArray.map {dish ->
        val data = dish.jsonObject["ListeAliments"]!!.jsonObject["V"]!!.jsonArray.map { decodeFood(it.jsonObject) }

        when (DishKind.fromInt(dish.jsonObject["G"]!!.jsonPrimitive.int)) {
            DishKind.Entry -> entry = data
            DishKind.Main -> main = data
            DishKind.Side -> side = data
            DishKind.Drink -> drink = data
            DishKind.Fromage -> fromage = data
            DishKind.Dessert -> dessert = data
        }
    }

    return Meal(
        name = meal["L"]?.jsonPrimitive?.content,
        entry = entry,
        main = main,
        side = side,
        drink = drink,
        fromage = fromage,
        dessert = dessert
    )
}