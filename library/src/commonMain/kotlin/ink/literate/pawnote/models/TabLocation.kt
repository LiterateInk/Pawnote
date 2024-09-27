package ink.literate.pawnote.models

enum class TabLocation (val code: Int) {
    Grades(198),
    Resources(89),
    Assignments(88),
    Timetable(16),
    Evaluations(201),
    Account(49),
    Presence(7),
    News(8),
    Notebook(19),
    Discussions(131),
    Gradebook(13),
    Menus(10);

    companion object {
        fun fromInt(code: Int) = entries.firstOrNull { it.code == code }
    }
}