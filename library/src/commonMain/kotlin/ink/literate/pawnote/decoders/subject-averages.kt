package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.SubjectAverages
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeSubjectAverages(average: JsonObject) =
    SubjectAverages(
        student =
            if (average["moyEleve"] != null)
                decodeGradeValue(average["moyEleve"]!!.jsonObject["V"]!!.jsonPrimitive.content)
            else null,
        outOf =
            if (average["baremeMoyEleve"] != null)
                decodeGradeValue(
                    average["baremeMoyEleve"]!!.jsonObject["V"]!!.jsonPrimitive.content)
            else null,
        defaultOutOf =
            if (average["baremeMoyEleveParDefaut"] != null)
                decodeGradeValue(
                    average["baremeMoyEleveParDefaut"]!!.jsonObject["V"]!!.jsonPrimitive.content)
            else null,
        classAverage =
            decodeGradeValue(average["moyClasse"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        min = decodeGradeValue(average["moyMin"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        max = decodeGradeValue(average["moyMax"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        subject = decodeSubject(average),
        backgroundColor = average["couleur"]!!.jsonPrimitive.content)
