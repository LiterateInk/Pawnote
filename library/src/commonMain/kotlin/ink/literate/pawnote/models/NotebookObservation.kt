package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class NotebookObservation(
    val id: String,
    val date: LocalDateTime,
    val opened: Boolean,
    val shouldParentsJustify: Boolean,
    val name: String,
    val kind: NotebookObservationKind,

    /**
     * ID of the observation section.
     *
     * Might be useful when you're looking for the same observation section when going through an
     * `StudentObservation` array.
     */
    val sectionID: String,
    val subject: Subject? = null,
    val reason: String? = null
)
