package ink.literate.pawnote.models

data class ResourceContent(
    val id: String,

    /** Optional because teachers can just write nothing here and only give a description. */
    val title: String? = null,
    /**
     * An HTML string to preserve all the formatting done in the UI.
     *
     * Optional because teachers can just write the title with no description.
     */
    val description: String? = null,
    val category: ResourceContentCategory,
    val files: List<Attachment>,
    /** Themes associated with the lesson. */
    val themes: List<AssignmentTheme>,

    /** `-1` when not defined. */
    val educativeValue: Int
)
