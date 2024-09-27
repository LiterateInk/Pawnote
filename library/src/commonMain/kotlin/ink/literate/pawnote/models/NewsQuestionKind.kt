package ink.literate.pawnote.models

enum class NewsQuestionKind (val code: Int) {
    /** Text from an information news. */
    InformationText(0),
    /** Question where there's only text (only from a survey news). */
    SurveyText(5),

    TextInput(1),
    UniqueChoice(2),
    MultipleChoice(3);

    companion object {
        fun fromInt(code: Int) = entries.first {it.code == code}
    }
}