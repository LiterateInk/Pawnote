package models

import kotlinx.datetime.LocalDateTime

data class NotebookPunishment(
    val id: String,
    val title: String,
    val reasons: List<String>,

    val isDuringLesson: Boolean,
    val exclusion: Boolean,

    val workToDo: String,
    val workToDoDocuments: List<Attachment>,

    val circumstances: String,
    val circumstancesDocuments: List<Attachment>,

    val giver: String,
    val dateGiven: LocalDateTime,

    val durationMinutes: Int
)