package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class Resource(
    val id: String,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,
    val subject: Subject,

    val haveAssignment: Boolean,
    val assignmentDeadline: LocalDateTime? = null,

    /** Color of the resource in HEX. */
    val backgroundColor: String,
    val contents: List<ResourceContent>,
    val teachers: List<String>,
    val groups: List<String>
)