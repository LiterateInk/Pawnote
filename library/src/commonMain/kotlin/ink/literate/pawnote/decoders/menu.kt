package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Meal
import ink.literate.pawnote.models.MealKind
import ink.literate.pawnote.models.Menu

import kotlinx.serialization.json.*

fun decodeMenu (menu: JsonObject): Menu {
    var lunch: Meal? = null
    var dinner: Meal? = null

    menu["ListeRepas"]!!.jsonObject["V"]!!.jsonArray.map { meal ->
        val data = decodeMeal(meal.jsonObject)

        when (MealKind.fromInt(meal.jsonObject["G"]!!.jsonPrimitive.int)) {
            MealKind.Lunch -> lunch = data
            MealKind.Dinner -> dinner = data
        }
    }

    return Menu(
        date = decodePronoteDate(menu["Date"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        lunch = lunch,
        dinner = dinner
    )
}