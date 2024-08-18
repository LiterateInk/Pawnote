import type Pronote from "~/client/Pronote";
import type { PronoteApiUserResources } from "~/api/user/resources/types";
import type { PronoteApiLessonContentCategory } from "~/constants/lessonCategory";

import { StudentAttachment } from "../../src/decoders/attachment";
import { StudentTheme } from "./theme";

export class StudentLessonContent {
  public id: string;

  /**
   * @remark Optional because teachers can just write nothing here and only give a description.
   */
  public title?: string;
  /**
   * An HTML string to preserve all the formatting done in the UI.
   * @remark Optional because teachers can just write the title with no description.
   */
  public description?: string;

  public category: PronoteApiLessonContentCategory;
  public files: StudentAttachment[];
  /** Themes associated with the lesson. */
  public themes: StudentTheme[];

  /** `-1` when not defined. */
  public educativeValue: number;

  constructor (
    client: Pronote,
    data: PronoteApiUserResources["response"]["donnees"]["ListeCahierDeTextes"]["V"][number]["listeContenus"]["V"][number]
  ) {
    this.id = data.N;
    this.title = data.L;
    this.description = data.descriptif.V;
    this.category = data.categorie.V.G;
    this.files = data.ListePieceJointe.V.map((attachment) => new StudentAttachment(client, attachment));

    this.themes = data.ListeThemes.V.map((theme) => new StudentTheme(theme));

    // NOTE: Needs to be investigated, to see what is contained here when not `-1`.
    this.educativeValue = data.parcoursEducatif;
  }
}
