package ink.literate.pawnote.models

enum class DocumentKind (val code: Int) {
    URL(0),
    FILE(1),
    CLOUD(2),
    KIOSK_LINK(3),
    CONFERENCE_LINK(4)
}