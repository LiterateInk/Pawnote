package ink.literate.pawnote.models

enum class DiscussionFolderKind (val code: Int) {
    OCEM_Utilisateur(0),
    OCEM_Pre_Reception(1),
    OCEM_Pre_Archive(2),
    OCEM_Pre_Envoye(3),
    OCEM_Pre_Brouillon(4),
    OCEM_Pre_Poubelle(5),
    OCEM_Pre_Signalement(6),
    OCEM_Expl_Bleu(7),
    OCEM_Expl_Vert(8),
    OCEM_Expl_Rouge(9),
    OCEM_Pre_CarnetLiaison(10),
    OCEM_Pre_Alerte(11),
    OCEM_Pre_ContactVS(12),
    OCEM_Pre_Conversation(13),
    OCEM_Pre_InvisiblePlageDesactivee(14);

    companion object {
        fun fromInt (code: Int) = entries.first { it.code == code }
    }
}