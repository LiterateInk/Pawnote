import type { PronoteApiUserNews } from "~/api/user/news/types";
import { PronoteApiNewsPublicSelf, PronoteApiNewsQuestionType } from "~/constants/news";
import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "./attachment";
import type Pronote from "~/client/Pronote";
type RawData = PronoteApiUserNews["response"]["donnees"];
type NewsItem = RawData["listeModesAff"][number]["listeActualites"]["V"][number];

export class StudentNews {
  public categories: StudentNewsCategory[];
  public items: (StudentNewsInformation | StudentNewsSurvey)[];

  constructor (client: Pronote, data: RawData) {
    this.categories = data.listeCategories.V.map((category) => new StudentNewsCategory(category));
    this.items = data.listeModesAff[0].listeActualites.V.map((item) => {
      let Builder: typeof StudentNewsInformation | typeof StudentNewsSurvey;

      if (item.estInformation) Builder = StudentNewsInformation;
      else if (item.estSondage) Builder = StudentNewsSurvey;
      else throw new Error("Unknown news type");

      return new Builder(client, item, this.categories);
    });
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

export class StudentNewsSurvey {
  readonly #id: string;
  readonly #title?: string;
  readonly #category: StudentNewsCategory;

  /** Whether your response is anonymous or not. */
  readonly #anonymousResponse: boolean;

  /** Whether this news have been read or not. */
  readonly #read: boolean;

  readonly #creationDate: Date;
  readonly #startDate: Date;
  readonly #endDate: Date;

  /**
   * Name of the author of the information / survey.
   * @example "John D."
   */
  readonly #author: string;
  readonly #questions: StudentNewsItemQuestion[];

  constructor (client: Pronote, data: NewsItem, categories: StudentNewsCategory[]) {
    this.#id = data.N;
    this.#title = data.L;
    this.#category = categories.find((category) => category.id === data.categorie.V.N)!;

    this.#anonymousResponse = data.reponseAnonyme;

    this.#read = data.lue;

    this.#creationDate = readPronoteApiDate(data.dateCreation.V);
    this.#startDate = readPronoteApiDate(data.dateDebut.V);
    this.#endDate = readPronoteApiDate(data.dateFin.V);

    this.#author = data.auteur;
    this.#questions = data.listeQuestions.V.map((question) => new StudentNewsItemQuestion(client, question));
  }
}

export class StudentNewsItemQuestion {
  readonly #id: string;

  readonly #fullTitle: string;
  readonly #title: string;
  readonly #position: number;
  readonly #type: PronoteApiNewsQuestionType;

  readonly #maximumLength: number;
  readonly #shouldRespectMaximumChoices: boolean;
  readonly #maximumChoices: number;

  readonly #content: string;
  readonly #attachments: StudentAttachment[];

  readonly #genre: number;

  #answer?: "" | number[];

  readonly #answerID: string;
  #answered: boolean;
  readonly #shouldAnswer: boolean;

  // TODO: Make it into a class
  readonly #choices: Array<{
    value: string;
    position: number;
    isTextInput: boolean;
  }>;

  constructor (client: Pronote, data: NewsItem["listeQuestions"]["V"][number]) {
    this.#id = data.N;
    this.#fullTitle = data.L;
    this.#title = data.titre;
    this.#position = data.rang;
    this.#type = data.genreReponse;

    this.#maximumLength = data.tailleReponse;
    this.#shouldRespectMaximumChoices = data.avecMaximum;
    this.#maximumChoices = data.nombreReponsesMax;
    this.#content = data.texte.V;

    this.#attachments = data.listePiecesJointes.V.map((attachment) => new StudentAttachment(client, attachment));

    this.#genre = data.genreReponse;

    // value handling.
    this.#answerID = data.reponse.V.N;
    this.#answered = data.reponse.V.avecReponse;
    this.#shouldAnswer = data.reponse.V.estReponseAttendue;

    // On `TextInput`, we have two choices by default : `Yes` and `No`.
    // Those two choices are literally USELESS and misleading for the user,
    // so we provide an empty array instead if the type is TextInput.
    this.#choices = this.#type === PronoteApiNewsQuestionType.TextInput ? [] : data.listeChoix.V.map((choice) => ({
      value: choice.L,
      position: choice.rang,
      isTextInput: !!choice.estReponseLibre
    }));
  }

  public get id (): string {
    return this.#id;
  }

  public get fullTitle (): string {
    return this.#fullTitle;
  }

  public get title (): string {
    return this.#title;
  }

  public get position (): number {
    return this.#position;
  }

  public get type (): PronoteApiNewsQuestionType {
    return this.#type;
  }

  public get maximumLength (): number {
    return this.#maximumLength;
  }

  public get shouldRespectMaximumChoices (): boolean {
    return this.#shouldRespectMaximumChoices;
  }

  public get maximumChoices (): number {
    return this.#maximumChoices;
  }

  public get content (): string {
    return this.#content;
  }

  public get attachments (): StudentAttachment[] {
    return this.#attachments;
  }

  public get genre (): number {
    return this.#genre;
  }

  public get answer (): "" | number[] | undefined {
    return this.#answer;
  }

  public set answer (answer: "" | number[] | undefined) {
    this.#answer = answer;
    this.#answered = typeof answer !== "undefined";
  }

  public get answerID (): string {
    return this.#answerID;
  }

  public get answered (): boolean {
    return this.#answered;
  }

  public get shouldAnswer (): boolean {
    return this.#shouldAnswer;
  }

  public get choices (): Array<{ // TODO: Use a class, see TODO from above.
    value: string;
    position: number;
    isTextInput: boolean;
  }> {
    return this.#choices;
  }
}

export class StudentNewsInformation {
  readonly #client: Pronote;

  readonly #id: string;
  readonly #title?: string;
  readonly #category: StudentNewsCategory;

  readonly #creationDate: Date;
  readonly #startDate: Date;
  readonly #endDate: Date;

  readonly #question: StudentNewsItemQuestion;
  readonly #attachments: StudentAttachment[];

  #read: boolean;
  #acknowledged: boolean;
  #acknowledgedDate?: Date;
  readonly #needToAcknowledge: boolean;

  readonly #author: string;
  readonly #content: string;
  readonly #publicSelfData: PronoteApiNewsPublicSelf;

  constructor (client: Pronote, data: NewsItem, categories: StudentNewsCategory[]) {
    this.#client = client;

    this.#id = data.N;
    this.#title = data.L;
    this.#category = categories.find((category) => category.id === data.categorie.V.N)!;

    this.#creationDate = readPronoteApiDate(data.dateCreation.V);
    this.#startDate = readPronoteApiDate(data.dateDebut.V);
    this.#endDate = readPronoteApiDate(data.dateFin.V);

    const question = data.listeQuestions.V[0];
    this.#question = new StudentNewsItemQuestion(client, question);
    this.#attachments = this.#question.attachments;

    this.#read = data.lue;
    this.#acknowledged = question.reponse.V.avecReponse;
    if (question.reponse.V.reponduLe) this.#acknowledgedDate = readPronoteApiDate(question.reponse.V.reponduLe.V);
    this.#needToAcknowledge = this.#question.shouldAnswer;

    this.#author = data.auteur;
    this.#content = question.texte.V;
    this.#publicSelfData = {
      id: data.public.V.N,
      type: data.public.V.G,
      name: data.public.V.L
    };
  }

  /**
   * Will acknowledge the news if needed,
   * so if the news doesn't need to be acknowledged (`!needToAcknowledge`)
   * or is already `acknowledged`, we will just mark it as read.
   */
  public async acknowledge (): Promise<void> {
    if (!this.#needToAcknowledge || this.#acknowledged) return this.markAsRead(true);

    // An empty string is needed to acknowledge.
    this.#question.answer = "";

    await this.#client.patchNewsState({
      id: this.#id,
      name: this.#title ?? "",
      public: this.#publicSelfData
    }, [this.#question], {
      markAsRead: true,
      markAsReadOnly: !this.#needToAcknowledge
    });

    if (this.#needToAcknowledge) {
      this.#acknowledged = true;
      this.#acknowledgedDate = new Date();
    }
  }

  /**
   * Patches the `read` state of the news to the given value.
   * @remark Will do nothing if `this.read === status`.
   */
  public async markAsRead (status = true): Promise<void> {
    if (this.#read === status) return;

    await this.#client.patchNewsState({
      id: this.#id,
      name: this.#title ?? "",
      public: this.#publicSelfData
    }, [], {
      markAsRead: status,
      markAsReadOnly: true
    });
  }

  public get id (): string {
    return this.#id;
  }

  public get title (): string | undefined {
    return this.#title;
  }

  public get category (): StudentNewsCategory {
    return this.#category;
  }

  /**
   * Whether this news have been read or not.
   * @remark This is not the same as acknowledging the news, see `acknowledged` property.
   */
  public get read (): boolean {
    return this.#read;
  }

  /**
   * Whether this news have been acknowledged or not.
   * @remark This is not the same as reading the news, see `read` property.
   */
  public get acknowledged (): boolean {
    return this.#acknowledged;
  }

  /**
   * Date when the news have been acknowledged.
   * Only available if `acknowledged` is `true`.
  */
  public get acknowledgedDate (): Date | undefined {
    return this.#acknowledgedDate;
  }

  public get needToAcknowledge (): boolean {
    return this.#needToAcknowledge;
  }

  public get creationDate (): Date {
    return this.#creationDate;
  }

  public get startDate (): Date {
    return this.#startDate;
  }

  public get endDate (): Date {
    return this.#endDate;
  }

  /**
   * Name of the author of the information / survey.
   * @example "John D."
   */
  public get author (): string {
    return this.#author;
  }

  /** HTML string containing the news. */
  public get content (): string {
    return this.#content;
  }

  public get attachments (): StudentAttachment[] {
    return this.#attachments;
  }
}
