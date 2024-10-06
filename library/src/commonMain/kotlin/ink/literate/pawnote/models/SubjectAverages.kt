package ink.literate.pawnote.models

data class SubjectAverages(
    /** students average in the subject */
    val student: GradeValue? = null,
    /** classes average in the subject */
    val classAverage: GradeValue,
    /** highest average in the class */
    val max: GradeValue,
    /** lowest average in the class */
    val min: GradeValue,
    /** maximum amount of points */
    val outOf: GradeValue? = null,
    /** the default maximum amount of points */
    val defaultOutOf: GradeValue? = null,
    /** subject the average is from */
    val subject: Subject,
    /** background color of the subject */
    val backgroundColor: String
)
