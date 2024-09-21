package models

enum class AccessKind (val code: Int) {
    Internat(0),
    Etablissement(1),
    DP(2);

    companion object {
        fun fromInt(code: Int) = entries.first {it.code == code}
    }
}