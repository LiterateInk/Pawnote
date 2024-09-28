package ink.literate.pawnote.models

enum class ResourceContentCategory (val code: Int) {
    NONE(0),
    /** Corresponds to "Cours" */
    LESSON(1),
    /** Corresponds to "Correction" */
    CORRECTION(2),
    /** Corresponds to "Devoir sur table" */
    DST(3),
    /** Corresponds to "Interrogation orale" */
    ORAL_INTERROGATION(4),
    /** Corresponds to "Travaux dirigés" */
    TD(5),
    /** Corresponds to "Travaux pratiques" */
    TP(6),
    /** Corresponds to "Evaluation de compétences" */
    EPI(8),
    /** Corresponds to "AP" */
    AP(9),
    /** Corresponds to "Visio" */
    VISIO(12);

    companion object {
        fun fromInt (code: Int) = entries.first { it.code == code }
    }
}