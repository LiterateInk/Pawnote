package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Subject
import ink.literate.pawnote.models.TimetableClassLesson
import kotlinx.serialization.json.*

fun decodeTimetableClassLesson(item: JsonObject): TimetableClassLesson {
  val virtualClassrooms: MutableList<String> = mutableListOf()
  val teacherNames: MutableList<String> = mutableListOf()
  val personalNames: MutableList<String> = mutableListOf()
  val classrooms: MutableList<String> = mutableListOf()
  val groupNames: MutableList<String> = mutableListOf()

  var subject: Subject? = null
  var lessonResourceID: String? = null

  if (item.containsKey("listeVisios")) {
    for (virtualClassroom in item["listeVisios"]!!.jsonObject["V"]!!.jsonArray) virtualClassrooms
        .add(virtualClassroom.jsonObject["url"]!!.jsonPrimitive.content)
  }

  if (item.containsKey("ListeContenus")) {
    for (data in item["ListeContenus"]!!.jsonObject["V"]!!.jsonArray) {
      val dataObj = data.jsonObject
      when (dataObj["G"]!!.jsonPrimitive.int) {
        16 -> subject = decodeSubject(dataObj)
        3 -> teacherNames.add(dataObj["L"]!!.jsonPrimitive.content)
        34 -> personalNames.add(dataObj["L"]!!.jsonPrimitive.content)
        17 -> classrooms.add(dataObj["L"]!!.jsonPrimitive.content)
        2 -> groupNames.add(dataObj["L"]!!.jsonPrimitive.content)
      }
    }
  }

  if (item["AvecCdT"]?.jsonPrimitive?.boolean == true && item.containsKey("cahierDeTextes"))
      lessonResourceID =
          item["cahierDeTextes"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content

  return TimetableClassLesson(
      kind = item["G"]!!.jsonPrimitive.int,
      status = item["Statut"]?.jsonPrimitive?.content,
      canceled = item["estAnnule"]?.jsonPrimitive?.boolean ?: false,
      exempted = item["dispenseEleve"]?.jsonPrimitive?.boolean ?: false,
      test =
          if (item["cahierDeTextes"] != null)
              item["cahierDeTextes"]!!
                  .jsonObject["V"]!!
                  .jsonObject["estDevoir"]
                  ?.jsonPrimitive
                  ?.boolean ?: false
          else false,
      virtualClassrooms = virtualClassrooms,
      personalNames = personalNames,
      teacherNames = teacherNames,
      classrooms = classrooms,
      groupNames = groupNames,
      subject = subject,
      lessonResourceID = lessonResourceID)
}
