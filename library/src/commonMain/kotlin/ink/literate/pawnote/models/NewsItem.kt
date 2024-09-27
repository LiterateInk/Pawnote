package ink.literate.pawnote.models

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.json.JsonObject

data class NewsItem <T> (
    val id: String,
    val title: String?,
    val category: ink.literate.pawnote.models.NewsCategory,

    val creationDate: LocalDateTime,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,

    /**
     * Name of the author of the information / survey.
     * @example "John D."
     */
    val author: String,

    /**
     * Low level data about the public information of the user that'll send answers.
     * Used internally when sending answers to the server.
     *
     * Most of the time, you won't need this.
     */
    val public: JsonObject,

    /**
     * Whether this news have been read or not.
     */
    var read: Boolean,

    val data: T
)