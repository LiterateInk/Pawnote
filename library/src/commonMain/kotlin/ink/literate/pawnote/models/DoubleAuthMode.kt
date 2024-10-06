package ink.literate.pawnote.models

enum class DoubleAuthMode(val code: Int) {
  MGDA_PasEncoreChoisi(0),
  MGDA_Inactive(1),
  MGDA_NotificationSeulement(2),
  MGDA_SaisieCodePIN(3);

  companion object {
    fun fromInt(code: Int) = entries.first { it.code == code }
  }
}
