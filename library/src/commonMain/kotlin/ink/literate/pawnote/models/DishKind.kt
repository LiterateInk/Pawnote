package ink.literate.pawnote.models

enum class DishKind(val code: Int) {
  Entry(0),
  Main(1),
  Side(2),
  Drink(3),
  Fromage(4),
  Dessert(5);

  companion object {
    fun fromInt(code: Int) = entries.first { it.code == code }
  }
}
