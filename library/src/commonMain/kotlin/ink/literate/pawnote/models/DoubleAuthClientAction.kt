package ink.literate.pawnote.models

enum class DoubleAuthClientAction (val code: Int) {
    AIHMSC_PersonnalisationMotDePasse(0),
    AIHMSC_ChoixStrategie(1),
    AIHMSC_ChoixCodePINetSource(2),
    AIHMSC_SaisieCodePINetSource(3),
    AIHMSC_ReinitCodePINetSource(4),
    AIHMSC_SaisieSourcePourNotifSeulement(5);

    companion object {
        fun fromInt (code: Int) = entries.first { it.code == code }
    }
}