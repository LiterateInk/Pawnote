package ink.literate.pawnote.models

enum class AssignmentReturnKind (val code: Int) {
    None(0),
    Paper(1),
    FileUpload(2),
    Kiosk(3),

    /** Only available since version 2024. */
    AudioRecording(4);

    companion object {
        fun fromInt (code: Int) = entries.first { it.code == code }
    }
}