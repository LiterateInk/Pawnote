package decoders

import kotlinx.serialization.json.*
import models.Evaluation

fun decodeEvaluation (evaluation: JsonObject): Evaluation {
    val skills = evaluation["listeNiveauxDAcquisitions"]!!.jsonObject["V"]!!.jsonArray.map { decodeSkill(it.jsonObject) }
    skills.sortedWith { a, b -> a.order - b.order }

    return Evaluation(
        skills = skills,
        name = evaluation["L"]!!.jsonPrimitive.content,
        id = evaluation["N"]!!.jsonPrimitive.content,
        teacher = evaluation["individu"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
        coefficient = evaluation["coefficient"]!!.jsonPrimitive.int,
        description = evaluation["descriptif"]!!.jsonPrimitive.content,
        subject = decodeSubject(evaluation["matiere"]!!.jsonObject["V"]!!.jsonObject),
        levels = evaluation["listePaliers"]!!.jsonObject["V"]!!.jsonArray.map { it.jsonObject["L"]!!.jsonPrimitive.content },
        date = decodePronoteDate(evaluation["date"]!!.jsonObject["V"]!!.jsonPrimitive.content)
    )
}