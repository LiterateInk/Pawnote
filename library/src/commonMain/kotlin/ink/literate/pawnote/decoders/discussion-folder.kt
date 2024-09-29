package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.DiscussionFolder
import ink.literate.pawnote.models.DiscussionFolderKind
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonPrimitive

fun decodeDiscussionFolder (folder: JsonObject) = DiscussionFolder(
    id = folder["N"]!!.jsonPrimitive.content,
    name = folder["L"]!!.jsonPrimitive.content,
    kind = DiscussionFolderKind.fromInt(folder["G"]!!.jsonPrimitive.int)
)