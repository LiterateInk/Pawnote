package ink.literate.pawnote.api.private

import ink.literate.pawnote.models.Discussion

data class DiscussionsCache(
    val discussions: List<Discussion>,
    val refs: MutableMap<String, Any> = mutableMapOf()
)