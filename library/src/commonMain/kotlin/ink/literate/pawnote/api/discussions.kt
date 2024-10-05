package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeDiscussion
import ink.literate.pawnote.decoders.decodeDiscussionFolder
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionFolder
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

data class DiscussionsResponse(
    val folders: List<DiscussionFolder>,
    val items: MutableList<Discussion>
)

@OptIn(ExperimentalSerializationApi::class)
suspend fun discussions (session: SessionHandle, cache: MutableList<Discussion> = mutableListOf()): DiscussionsResponse {
    val request = RequestFN(session.information, "ListeMessagerie", Json.encodeToString(
        buildJsonObject {
            putJsonObject("_Signature_") {
                put("onglet", TabLocation.Discussions.code)
            }

            putJsonObject("donnees") {
                put("avecLu", true)
                put("avecMessage", true)
                put("possessionMessageDiscussionUnique", null)
            }
        }
    ))

    val response = request.send()
    val data = Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject

    val folders = data["listeEtiquettes"]!!.jsonObject["V"]!!.jsonArray.map { decodeDiscussionFolder(it.jsonObject) }

    val items = data["listeMessagerie"]!!.jsonObject["V"]!!.jsonArray
        .filter {
            val discussion = it.jsonObject
            val hasZeroDepth = (discussion["profondeur"]?.jsonPrimitive?.int ?: 0) == 0
            val hasParticipants = if (discussion["messagePourParticipants"] != null) discussion["messagePourParticipants"]!!.jsonObject["V"]!!.jsonObject["N"] != null else false
            discussion["estUneDiscussion"]?.jsonPrimitive?.boolean ?: false && hasParticipants && hasZeroDepth
        }
        .map { decodeDiscussion(it.jsonObject, folders, cache) }

    cache.clear()

    cache.addAll(items)

    return DiscussionsResponse(
        folders = folders,
        items = cache
    )
}