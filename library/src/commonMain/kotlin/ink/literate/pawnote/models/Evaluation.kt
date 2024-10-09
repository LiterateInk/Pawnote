package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class Evaluation(
    val name: String,
    val id: String,
    val teacher: String,
    val coefficient: Int,
    val description: String,
    val subject: Subject,
    /** Example: ["Cycle 4"] */
    val levels: List<String>,
    val skills: List<Skill>,
    val date: LocalDateTime
)
