package models

data class NewsCategory(
    val id: String,
    val name: String,
    /**
     * Whether this category is the default selected in the UI.
     */
    val default: Boolean
)
