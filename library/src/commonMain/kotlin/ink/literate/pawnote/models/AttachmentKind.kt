package ink.literate.pawnote.models

enum class AttachmentKind (val code: Int) {
    Link(0),
    File(1);

    companion object {
        fun fromInt(code: Int) = entries.first {it.code == code}
    }
}