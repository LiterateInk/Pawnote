package ink.literate.pawnote.models

enum class MealKind(val code: Int) {
  Lunch(0),
  Dinner(1);

  companion object {
    fun fromInt(code: Int) = entries.first { it.code == code }
  }
}
