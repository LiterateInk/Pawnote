package ink.literate.pawnote.models

data class UserResource(
    val id: String,
    val kind: Int,
    val name: String,
    val className: String?,
    val establishmentName: String,
    val profilePicture: Attachment? = null,
    val isDirector: Boolean,
    val isDelegate: Boolean,
    val isMemberCA: Boolean,
    val tabs: Map<TabLocation, Tab>
)
