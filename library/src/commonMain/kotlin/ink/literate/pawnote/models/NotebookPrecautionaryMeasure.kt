package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class NotebookPrecautionaryMeasure(
    val id: String,
    val title: String,
    val comments: String,
    val reasons: List<String>,

    val exclusion: Boolean,

    val circumstances: String,
    val circumstancesDocuments: List<Attachment>,

    val decisionMaker: String,
    val giver: String,
    val dateGiven: LocalDateTime,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,

    val disallowedAccesses: List<AccessKind>
)