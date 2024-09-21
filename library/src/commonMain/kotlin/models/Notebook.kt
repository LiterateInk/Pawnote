package models

data class Notebook(
    val absences: List<NotebookAbsence>,
    val delays: List<NotebookDelay>,
    val punishments: List<NotebookPunishment>,
    val observations: List<NotebookObservation>,
    val precautionaryMeasures: List<NotebookPrecautionaryMeasure>
)