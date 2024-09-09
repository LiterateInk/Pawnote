package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.GradesOverview
import models.SessionInformation

fun decodeGradesOverview (overview: JsonObject, sessionInformation: SessionInformation): GradesOverview {
    return GradesOverview(
        grades = overview["listeDevoirs"]!!.jsonObject["V"]!!.jsonArray.map {decodeGrade(it.jsonObject, sessionInformation)},
        subjectsAverages = overview["listeServices"]!!.jsonObject["V"]!!.jsonArray.map { decodeSubjectAverages(it.jsonObject) },
        classAverage = if (overview["moyGeneraleClasse"] != null) decodeGradeValue(overview["moyGeneraleClasse"]!!.jsonObject["V"]!!.jsonPrimitive.content) else null,
        overallAverage = if (overview["moyGenerale"] != null) decodeGradeValue(overview["moyGenerale"]!!.jsonObject["V"]!!.jsonPrimitive.content) else null
    )
}