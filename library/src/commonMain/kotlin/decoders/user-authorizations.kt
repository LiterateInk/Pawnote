package decoders

import kotlinx.serialization.json.*
import models.TabLocation
import models.UserAuthorizations

fun decodeUserAuthorizations (data: JsonObject, tabs: JsonArray): UserAuthorizations {
    val canReadDiscussions = data["AvecDiscussion"]?.jsonPrimitive?.boolean ?: false
    val canDiscuss = canReadDiscussions && !(data["discussionInterdit"]?.jsonPrimitive?.boolean ?: false)
    val canDiscussWithStaff = canDiscuss && !(data["AvecDiscussionPersonnels"]?.jsonPrimitive?.boolean ?: false)
    val canDiscussWithParents = canDiscuss && !(data["AvecDiscussionParents"]?.jsonPrimitive?.boolean ?: false)
    val canDiscussWithStudents = canDiscuss && !(data["AvecDiscussionEleves"]?.jsonPrimitive?.boolean ?: false)
    val canDiscussWithTeachers = canDiscuss && !(data["AvecDiscussionProfesseurs"]?.jsonPrimitive?.boolean ?: false)

    val locations: MutableList<TabLocation> = mutableListOf()

    if (tabs.isNotEmpty()) {
        fun traverse (obj: JsonObject): Unit = run {
            if (obj.containsKey("G")) {
                val location = TabLocation.fromInt(obj["G"]!!.jsonPrimitive.int)

                if (location != null)
                    locations.add(location)
            }

            if (obj.containsKey("Onglet"))
                obj["Onglet"]!!.jsonArray.forEach{ traverse(it.jsonObject) }
        }

        tabs.forEach { traverse(it.jsonObject) }
    }

    return UserAuthorizations(
        canReadDiscussions = canReadDiscussions,
        canDiscuss = canDiscuss,
        canDiscussWithStaff = canDiscussWithStaff,
        canDiscussWithParents = canDiscussWithParents,
        canDiscussWithStudents = canDiscussWithStudents,
        canDiscussWithTeachers = canDiscussWithTeachers,

        hasAdvancedDiscussionEditor = data["AvecDiscussionAvancee"]?.jsonPrimitive?.boolean ?: false,
        maxAssignmentFileUploadSize = data["tailleMaxRenduTafEleve"]!!.jsonPrimitive.long,

        tabs = locations
    )
}