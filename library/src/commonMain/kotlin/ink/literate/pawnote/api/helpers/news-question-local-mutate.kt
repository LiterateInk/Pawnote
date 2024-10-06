package ink.literate.pawnote.api.helpers

import ink.literate.pawnote.models.NewsQuestion
import ink.literate.pawnote.models.NewsQuestionKind
import ink.literate.pawnote.models.errors.UnreachableError
import kotlinx.datetime.*

fun newsQuestionLocalMutate(
    question: NewsQuestion,
    answers: Any? = null,
    textInput: String? = null
) {
  when (question.kind) {
    NewsQuestionKind.TextInput,
    NewsQuestionKind.InformationText -> {
      question.textInputAnswer = answers as? String
    }
    else -> {
      if (answers !is List<*>) throw UnreachableError("newsQuestionLocalMutate")
      else {
        question.selectedAnswers = answers.filterIsInstance<Int>()
        question.textInputAnswer = textInput
      }
    }
  }

  question.answered = answers != null
  question.answerDate =
      if (question.answered) Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())
      else null
}
