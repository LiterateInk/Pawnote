package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime

data class NewsQuestion(
    val id: String,
    val position: Int,
    val kind: NewsQuestionKind,
    val fullTitle: String,
    val title: String,
    val shouldRespectMaximumChoices: Boolean,
    val maximumChoices: Int,
    val maximumLength: Int,
    val attachments: List<Attachment>,
    val content: String,
    val answerId: String,
    val shouldAnswer: Boolean,
    val choices: List<NewsQuestionChoice>,
    var selectedAnswers: List<Int>? = null,
    var textInputAnswer: String? = null,
    var answered: Boolean,
    var answerDate: LocalDateTime? = null
)
