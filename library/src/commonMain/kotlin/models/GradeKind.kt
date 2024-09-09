package models

enum class GradeKind (val code: Int) {
    Error(-1),
    Grade(0),
    Absent(1),
    Exempted(2),
    NotGraded(3),
    Unfit(4),
    Unreturned(5),
    AbsentZero(6),
    UnreturnedZero(7),
    Congratulations(8);

    companion object {
        fun fromInt(code: Int) = entries.first { it.code == code }
    }
}
