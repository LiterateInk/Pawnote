package decoders

import kotlinx.serialization.json.*
import models.Attachment
import models.AttachmentKind
import models.Grade
import models.SessionInformation

fun decodeGrade (grade: JsonObject, sessionInformation: SessionInformation): Grade {
    val id = grade["N"]!!.jsonPrimitive.content
    val isBonus = grade["estBonus"]!!.jsonPrimitive.boolean

    val attachment: (key: String, genre: String) -> Attachment? = {key, genre ->
        if (grade[key] == null) null
        else
        decodeAttachment(buildJsonObject {
            put("G", AttachmentKind.File.code)
            put("L", grade[key]!!)
            put("N", id)
        }, sessionInformation, buildJsonObject { put("G", genre) })
    }

    return Grade(
        id = id,
        value = decodeGradeValue(grade["note"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        outOf = decodeGradeValue(grade["bareme"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        defaultOutOf = decodeGradeValue(grade["baremeParDefaut"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        date = decodePronoteDate(grade["date"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        subject = decodeSubject(grade["service"]!!.jsonObject["V"]!!.jsonObject),
        average = if (grade["moyenne"] != null) decodeGradeValue(grade["moyenne"]!!.jsonObject["V"]!!.jsonPrimitive.content) else null,
        max = decodeGradeValue(grade["noteMax"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        min = decodeGradeValue(grade["noteMin"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        coefficient = grade["coefficient"]!!.jsonPrimitive.double,
        comment = grade["commentaire"]!!.jsonPrimitive.content,
        isBonus = isBonus,
        isOptional = (grade["estFacultatif"]?.jsonPrimitive?.boolean ?: false) && !isBonus,
        isOutOf20 = grade["estRamenerSur20"]!!.jsonPrimitive.boolean,
        subjectFile = attachment("libelleSujet", "DevoirSujet"),
        correctionFile = attachment("libelleCorrige", "DevoirCorrige")
    )
}