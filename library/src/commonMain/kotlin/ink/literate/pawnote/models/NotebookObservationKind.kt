package ink.literate.pawnote.models

enum class NotebookObservationKind(val code: Int) {
  LogBookIssue(0),
  Observation(1),
  Encouragement(2),
  Other(3);

  companion object {
    fun fromInt(code: Int) = entries.first { it.code == code }
  }
}
