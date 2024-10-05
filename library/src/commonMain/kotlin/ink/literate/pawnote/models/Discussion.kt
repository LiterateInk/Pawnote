package ink.literate.pawnote.models

import kotlinx.serialization.json.JsonArray

class Discussion(
    val creator: String? = null,
    val recipientName: String? = null,

    /**
     * Output is very variable, see example below.
     * Because of this behavior, we can't transform this into a date.
     *
     * Maybe, we could parse this manually, but it's not a priority.
     *
     * @example
     * "lundi 08h53"
     * // or can just be the hour
     * "07h26"
     */
    val dateAsFrenchText: String,

    /**
     * Internal string containing the ID of the message
     * needed to fetch the participants of the discussion.
     */
    val participantsMessageID: String,

    /**
     * Property used internally to manage messages in
     * this discussion in requests.
     *
     * You can ignore this property.
     */
    val possessions: JsonArray,

    /**
     * Title of the discussion.
     */
    val subject: String,

    val numberOfDrafts: Int,
    val numberOfMessages: Int,
    val numberOfMessagesUnread: Int,
    val folders: List<DiscussionFolder>,
    val closed: Boolean,

    val cache: MutableList<Discussion>,

    var messages: DiscussionMessages? = null
)