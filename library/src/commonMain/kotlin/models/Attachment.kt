package models

data class Attachment(
    val kind: AttachmentKind,
    val name: String,
    val url: String,
    val id: String
)
