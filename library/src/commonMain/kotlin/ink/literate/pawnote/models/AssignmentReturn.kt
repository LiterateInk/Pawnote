package ink.literate.pawnote.models

data class AssignmentReturn(
    val kind: AssignmentReturnKind,
    /**
     * File that the user uploaded.
     */
    var uploaded: Attachment? = null,
    /**
     * Whether the user can upload a file or not.
     */
    var canUpload: Boolean
    // NOTE: Not sure if we can block the upload once the user has uploaded a file (so the property updates from `true` to `false`)
    // If we cannot, then this should be readonly.
)