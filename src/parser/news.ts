import type { PronoteApiUserNews } from "~/api/user/news/types";
import type { PronoteApiNewsQuestionType } from "~/constants/news";
import { readPronoteApiDate } from "~/pronote/dates";
type RawData = PronoteApiUserNews["response"]["donnees"];

export class StudentNews {
  public categories: StudentNewsCategory[];
  public items: StudentNewsItem[];

  constructor (data: RawData) {
    this.categories = data.listeCategories.V.map((category) => new StudentNewsCategory(category));
    this.items = data.listeModesAff[0].listeActualites.V.map((item) => new StudentNewsItem(item, this.categories));
  }
}

export class StudentNewsCategory {
  public id: string;
  public name: string;

  /**
   * Whether this category is the default selected in the UI.
   */
  public isDefault?: boolean;

  constructor (data: Omit<RawData["listeCategories"]["V"][number], "estDefaut"> & { estDefaut?: boolean }) {
    this.id = data.N;
    this.name = data.L;
    this.isDefault = data.estDefaut;
  }
}

export class StudentNewsItem {
  public id: string;
  public title?: string;

  /**
   * Whether your response is anonymous or not.
   */
  public anonymousResponse: boolean;

  public isInformation: boolean;
  public isSurvey: boolean;

  public category: StudentNewsCategory;

  /**
   * Whether this news have been read or not.
   */
  public read: boolean;

  public startDate: Date;
  public endDate: Date;
  public creationDate: Date;

  /**
   * Name of the author of the information / survey.
   * @example "John D."
   */
  public author: string;

  public questions: StudentNewsItemQuestion[];

  constructor (data: RawData["listeModesAff"][number]["listeActualites"]["V"][number], categories: StudentNewsCategory[]) {
    this.id = data.N;
    this.title = data.L;

    this.anonymousResponse = data.reponseAnonyme;

    this.isInformation = data.estInformation;
    this.isSurvey = data.estSondage;

    this.category = categories.find((category) => category.id === data.categorie.V.N)!;

    this.read = data.lue;

    this.startDate = readPronoteApiDate(data.dateDebut.V);
    this.endDate = readPronoteApiDate(data.dateFin.V);
    this.creationDate = readPronoteApiDate(data.dateCreation.V);

    this.author = data.auteur;
    this.questions = data.listeQuestions.V.map((question) => new StudentNewsItemQuestion(question));
  }
}

export class StudentNewsItemQuestion {
  public id: string;
  public fullTitle: string;
  public title: string;
  public position: number;
  public type: PronoteApiNewsQuestionType;

  public maximumLength: number;
  public shouldRespectMaximumChoices: boolean;
  public maximumChoices: number;

  public content: string;

  constructor (data: RawData["listeModesAff"][number]["listeActualites"]["V"][number]["listeQuestions"]["V"][number]) {
    this.id = data.N;
    this.fullTitle = data.L;
    this.title = data.titre;
    this.position = data.rang;
    this.type = data.genreReponse;

    this.maximumLength = data.tailleReponse;
    this.shouldRespectMaximumChoices = data.avecMaximum;
    this.maximumChoices = data.nombreReponsesMax;
    this.content = data.texte.V;

    // TODO: Handle `listeChoix`
    // TODO: Handle `listePiecesJointes`
  }
}
