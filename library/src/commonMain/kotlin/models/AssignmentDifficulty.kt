package models

enum class AssignmentDifficulty (val code: Int) {
    None(0),
    Easy(1),
    Medium(2),
    Hard(3);

    companion object {
        fun fromInt (code: Int) = entries.first { it.code == code }
    }
}