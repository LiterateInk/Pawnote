package models

data class NewsSurvey(
    /**
     * List of the questions contained in this survey.
     * You can answer them by reassigning the `answer` property.
     *
     * @example
     * question.answer = "[1..2]";
     */
    val questions: List<NewsQuestion>,

    /** Whether your reply is anonymous or not. */
    val isAnonymous: Boolean
) {
    val type: String = "survey"
}
