package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.TimetableClassDetention
import kotlinx.serialization.json.*

fun decodeTimetableClassDetention(item: JsonObject): TimetableClassDetention {
  var title: String? = null

  val personalNames: MutableList<String> = mutableListOf()
  val teacherNames: MutableList<String> = mutableListOf()
  val classrooms: MutableList<String> = mutableListOf()

  if (item.containsKey("ListeContenus")) {
    for (data in item["ListeContenus"]!!.jsonObject["V"]!!.jsonArray) {
      val dataObj = data.jsonObject
      val label = dataObj["L"]!!.jsonPrimitive.content

      if (dataObj["estHoraire"]?.jsonPrimitive?.boolean == true) title = label
      else if (dataObj.containsKey("G"))
          when (dataObj["G"]!!.jsonPrimitive.int) {
            3 -> teacherNames.add(label)
            34 -> personalNames.add(label)
            17 -> classrooms.add(label)
          }
    }
  }

  return TimetableClassDetention(
      title = title,
      personalNames = personalNames,
      teacherNames = teacherNames,
      classrooms = classrooms)
}
