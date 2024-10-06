package ink.literate.pawnote.models

data class GradesOverview(
    val subjectsAverages: List<SubjectAverages>,
    val overallAverage: GradeValue? = null,
    val classAverage: GradeValue? = null,
    val grades: List<Grade>
)
