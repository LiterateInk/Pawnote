package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class Grade(
    /** the id of the grade (used internally) */
    val id: String,
    /** the actual grade */
    val value: GradeValue,
    /** the maximum amount of points */
    val outOf: GradeValue,
    /** the default maximum amount of points */
    val defaultOutOf: GradeValue? = null,
    /** the date on which the grade was given */
    val date: LocalDateTime,
    /** the subject in which the grade was given */
    val subject: Subject,
    /** the average of the class */
    val average: GradeValue? = null,
    /** the highest grade */
    val max: GradeValue,
    /** the lowest grade */
    val min: GradeValue,
    /** the coefficient of the grade */
    val coefficient: Double,
    /** comment on the grade description */
    val comment: String,
    /** is the grade bonus: only points above 10 count */
    val isBonus: Boolean,
    /** is the grade optional : the grade only counts if it increases the average */
    val isOptional: Boolean,
    /** is the grade out of 20. Example 8/10 -> 16/20 */
    val isOutOf20: Boolean,
    /** the file of the subject */
    val subjectFile: Attachment? = null,
    /** the file of the correction */
    val correctionFile: Attachment? = null
)
