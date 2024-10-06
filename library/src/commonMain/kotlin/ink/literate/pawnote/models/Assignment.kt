package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class Assignment(
    val id: String,
    val subject: Subject,
    val description: String,
    val backgroundColor: String,
    val done: Boolean,
    val deadline: LocalDateTime,
    val attachments: List<Attachment>,
    val difficulty: AssignmentDifficulty,
    /** Time that should take, in minutes, to do the homework. */
    val length: Double? = null,
    /** Themes associated with this homework. */
    val themes: List<AssignmentTheme>,
    val `return`: AssignmentReturn,
    /** If defined, can be used to retrieve the lesson contents from the resources tab. */
    val resourceID: String? = null
)
