import { type Assignment, type SessionHandle, AssignmentReturnKind } from "~/models";
import { decodeSubject } from "./subject";
import { decodePronoteDate } from "./pronote-date";
import { decodeAttachment } from "./attachment";
import { decodeAssignmentTheme } from "./assignment-theme";

export const decodeAssignment = (assignment: any, session: SessionHandle): Assignment => {
  return {
    id: assignment.N,
    subject: decodeSubject(assignment.Matiere.V),
    description: assignment.descriptif.V,
    backgroundColor: assignment.CouleurFond,
    done: assignment.TAFFait,
    deadline: decodePronoteDate(assignment.PourLe.V),
    attachments: assignment.ListePieceJointe.V.map((attachment: any) => decodeAttachment(attachment, session)),
    difficulty: assignment.niveauDifficulte,
    length: assignment.duree,
    themes: assignment.ListeThemes.V.map((theme: any) => decodeAssignmentTheme(theme)),
    return: {
      kind: assignment.genreRendu ?? AssignmentReturnKind.None,
      canUpload: assignment.peuRendre ?? false,
      uploaded: assignment.documentRendu && decodeAttachment(assignment.documentRendu.V, session)
    },
    lessonResourceID: assignment.cahierDeTextes?.V.N
  };
};
