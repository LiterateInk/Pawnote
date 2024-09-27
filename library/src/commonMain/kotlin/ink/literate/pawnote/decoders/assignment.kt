package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.*

import kotlinx.serialization.json.*

fun decodeAssignment (assignment: JsonObject, sessionInformation: SessionInformation) = Assignment(
    id = assignment["N"]!!.jsonPrimitive.content,
    subject = decodeSubject(assignment["Matiere"]!!.jsonObject["V"]!!.jsonObject),
    description = assignment["descriptif"]!!.jsonObject["V"]!!.jsonPrimitive.content,
    backgroundColor = assignment["CouleurFond"]!!.jsonPrimitive.content,
    done = assignment["TAFFait"]!!.jsonPrimitive.boolean,
    deadline = decodePronoteDate(assignment["PourLe"]!!.jsonObject["V"]!!.jsonPrimitive.content),
    attachments = assignment["ListePieceJointe"]!!.jsonObject["V"]!!.jsonArray.map { decodeAttachment(it.jsonObject, sessionInformation) },
    difficulty = AssignmentDifficulty.fromInt(assignment["niveauDifficulte"]!!.jsonPrimitive.int),
    length = assignment["duree"]!!.jsonPrimitive.double,
    themes = assignment["ListeThemes"]!!.jsonObject["V"]!!.jsonArray.map { decodeAssignmentTheme(it.jsonObject) },
    `return` = AssignmentReturn(
        kind = if (assignment["genreRendu"] != null) AssignmentReturnKind.fromInt(assignment["genreRendu"]!!.jsonPrimitive.int) else AssignmentReturnKind.None,
        canUpload = assignment["peuRendre"]?.jsonPrimitive?.boolean ?: false,
        uploaded = if (assignment["documentRendu"] != null) decodeAttachment(assignment["documentRendu"]!!.jsonObject["V"]!!.jsonObject, sessionInformation) else null
    ),
    resourceID = if (assignment["cahierDeTextes"] != null) assignment["cahierDeTextes"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content else null
)