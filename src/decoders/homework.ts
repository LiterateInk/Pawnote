import { type Homework, type SessionHandle, type HomeworkReturn, HomeworkReturnKind } from "~/models";
import { decodeSubject } from "./subject";
import { decodePronoteDate } from "./pronote-date";
import { decodeAttachment } from "./attachment";
import { decodeHomeworkTheme } from "./homework-theme";

export const decodeHomework = (homework: any, session: SessionHandle): Homework => {
  return {
    id: homework.N,
    subject: decodeSubject(homework.Matiere.V),
    description: homework.descriptif.V,
    backgroundColor: homework.CouleurFond,
    done: homework.TAFFait,
    deadline: decodePronoteDate(homework.PourLe.V),
    attachments: homework.ListePieceJointe.V.map((attachment: any) => decodeAttachment(attachment, session)),
    difficulty: homework.niveauDifficulte,
    length: homework.duree,
    themes: homework.ListeThemes.V.map((theme: any) => decodeHomeworkTheme(theme)),
    return: {
      kind: homework.genreRendu ?? HomeworkReturnKind.None,
      canUpload: homework.peuRendre ?? false,
      uploaded: homework.documentRendu && decodeAttachment(homework.documentRendu.V, session)
    },
    lessonResourceID: homework.cahierDeTextes?.V.N
  };
};
