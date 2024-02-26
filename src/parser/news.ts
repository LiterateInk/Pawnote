import type { PronoteApiUserNews } from "~/api/user/news/types";
import { PronoteApiNewsPublicSelf, PronoteApiNewsQuestionType } from "~/constants/news";
import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "./attachment";
import type Pronote from "~/client/Pronote";
type RawData = PronoteApiUserNews["response"]["donnees"];
type CategoryItem = RawData["listeCategories"]["V"][number];
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
  readonly #id: string;
  readonly #name: string;
  readonly #default: boolean;

  constructor (data: CategoryItem) {
    this.#id = data.N;
    this.#name = data.L;
    this.#default = data.estDefaut ?? false;
  }

  public get id (): string {
    return this.#id;
  }

  public get name (): string {
    return this.#name;
  }

  /**
   * Whether this category is the default selected in the UI.
   */
  public get default (): boolean {
    return this.#default;
  }
}

class StudentNewsItem {
  readonly #id: string;
  readonly #title?: string;
  readonly #category: StudentNewsCategory;

  readonly #creationDate: Date;
  readonly #startDate: Date;
  readonly #endDate: Date;

  readonly #author: string;
  readonly #publicSelfData: PronoteApiNewsPublicSelf;

  constructor (data: NewsItem, categories: StudentNewsCategory[]) {
    this.#id = data.N;
    this.#title = data.L;
    this.#category = categories.find((category) => category.id === data.categorie.V.N)!;

    this.#creationDate = readPronoteApiDate(data.dateCreation.V);
    this.#startDate = readPronoteApiDate(data.dateDebut.V);
    this.#endDate = readPronoteApiDate(data.dateFin.V);

    this.#author = data.auteur;
    this.#publicSelfData = new PronoteApiNewsPublicSelf(data.public.V);
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

  protected get publicSelfData (): PronoteApiNewsPublicSelf {
    return this.#publicSelfData;
  }
}

export class StudentNewsSurvey extends StudentNewsItem {
  readonly #client: Pronote;

  readonly #questions: StudentNewsItemQuestion[];
  /** Whether your response is anonymous or not. */
  readonly #isAnonymous: boolean;
  #read: boolean;

  constructor (client: Pronote, data: NewsItem, categories: StudentNewsCategory[]) {
    super(data, categories);
    this.#client = client;

    this.#questions = data.listeQuestions.V.map((question) => new StudentNewsItemQuestion(client, question));
    this.#isAnonymous = data.reponseAnonyme;
    this.#read = data.lue;
  }

  public get questions (): StudentNewsItemQuestion[] {
    return this.#questions;
  }

  /**
   * Whether your response is anonymous or not.
   */
  public get isAnonymous (): boolean {
    return this.#isAnonymous;
  }

  public get read (): boolean {
    return this.#read;
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
  #answerDate?: Date;

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
    this.#answerDate = data.reponse.V.reponduLe?.V ? readPronoteApiDate(data.reponse.V.reponduLe.V) : undefined;

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
    this.#answerDate = new Date();
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

  public get answerDate (): Date | undefined {
    return this.#answerDate;
  }

  public get choices (): Array<{ // TODO: Use a class, see TODO from above.
    value: string;
    position: number;
    isTextInput: boolean;
  }> {
    return this.#choices;
  }
}

export class StudentNewsInformation extends StudentNewsItem {
  readonly #client: Pronote;

  readonly #question: StudentNewsItemQuestion;
  readonly #attachments: StudentAttachment[];

  #read: boolean;

  constructor (client: Pronote, data: NewsItem, categories: StudentNewsCategory[]) {
    super(data, categories);
    this.#client = client;

    this.#question = new StudentNewsItemQuestion(client, data.listeQuestions.V[0]);
    this.#attachments = this.#question.attachments;

    this.#read = data.lue;
  }

  /**
   * Will acknowledge the news if needed,
   * so if the news doesn't need to be acknowledged (`!needToAcknowledge`)
   * or is already `acknowledged`, we will just mark it as read.
   */
  public async acknowledge (): Promise<void> {
    if (!this.needToAcknowledge || this.acknowledged) return this.markAsRead(true);

    // An empty string is needed to acknowledge.
    this.#question.answer = "";

    await this.#client.patchNewsState({
      id: this.id,
      name: this.title ?? "",
      public: this.publicSelfData
    }, [this.#question], {
      markAsRead: true,
      markAsReadOnly: !this.needToAcknowledge
    });
  }

  /**
   * Patches the `read` state of the news to the given value.
   * @remark Will do nothing if `this.read === status`.
   */
  public async markAsRead (status = true): Promise<void> {
    if (this.#read === status) return;

    await this.#client.patchNewsState({
      id: this.id,
      name: this.title ?? "",
      public: this.publicSelfData
    }, [], {
      markAsRead: status,
      markAsReadOnly: true
    });
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
    return this.#question.answered;
  }

  /**
   * Date when the news have been acknowledged.
   * Only available if `acknowledged` is `true`.
  */
  public get acknowledgedDate (): Date | undefined {
    return this.#question.answerDate;
  }

  public get needToAcknowledge (): boolean {
    return this.#question.shouldAnswer;
  }

  /** HTML string containing the news. */
  public get content (): string {
    return this.#question.content;
  }

  public get attachments (): StudentAttachment[] {
    return this.#attachments;
  }
}
