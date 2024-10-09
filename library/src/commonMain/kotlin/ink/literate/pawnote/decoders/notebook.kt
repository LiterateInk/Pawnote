package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.*
import kotlinx.serialization.json.*

fun decodeNotebook(notebook: JsonObject, session: SessionHandle): Notebook {
  val absences: MutableList<NotebookAbsence> = mutableListOf()
  val delays: MutableList<NotebookDelay> = mutableListOf()
  val punishments: MutableList<NotebookPunishment> = mutableListOf()
  val observations: MutableList<NotebookObservation> = mutableListOf()
  val precautionaryMeasures: MutableList<NotebookPrecautionaryMeasure> = mutableListOf()

  for (item in notebook["listeAbsences"]!!.jsonObject["V"]!!.jsonArray.map { it.jsonObject }) {
    when (item["G"]!!.jsonPrimitive.int) {
      13 -> absences.add(decodeNotebookAbsence(item))
      14 -> delays.add(decodeNotebookDelay(item))
      41 -> punishments.add(decodeNotebookPunishment(item, session))
      46 -> observations.add(decodeNotebookObservation(item))
      72 -> precautionaryMeasures.add(decodeNotebookPrecautionaryMeasure(item, session))
    }
  }

  // TODO: .Matieres
  // TODO: .listeRecapitulatifs
  // NOTE: not sure if .autorisations is needed, for now.
  // NOTE: not sure what .nbMaxJoursDeclarationAbsence and .listeSanctionUtilisateur are about, for
  // now.

  return Notebook(
      absences = absences,
      delays = delays,
      punishments = punishments,
      observations = observations,
      precautionaryMeasures = precautionaryMeasures)
}
