import type { PronoteApiUserNews } from "~/api/user/news/types";
import { PronoteApiNewsPublicSelf, PronoteApiNewsQuestionType } from "~/constants/news";
import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "./attachment";
import type Pronote from "~/client/Pronote";
import { parseSelection } from "~/pronote/select";
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
  readonly #client: Pronote;

  readonly #id: string;
  readonly #title?: string;
  readonly #category: StudentNewsCategory;

  readonly #creationDate: Date;
  readonly #startDate: Date;
  readonly #endDate: Date;

  readonly #author: string;
  readonly #public: PronoteApiNewsPublicSelf;

  #read: boolean;

  constructor (client: Pronote, data: NewsItem, categories: StudentNewsCategory[]) {
    this.#client = client;

    this.#id = data.N;
    this.#title = data.L;
    this.#category = categories.find((category) => category.id === data.categorie.V.N)!;

    this.#creationDate = readPronoteApiDate(data.dateCreation.V);
    this.#startDate = readPronoteApiDate(data.dateDebut.V);
    this.#endDate = readPronoteApiDate(data.dateFin.V);

    this.#author = data.auteur;
    this.#public = new PronoteApiNewsPublicSelf(data.public.V);

    this.#read = data.lue;
  }

  /** Internal helper to get the current news state information. */
  get #stateInformation () {
    return {
      id: this.#id,
      title: this.#title ?? "",
      public: this.#public
    };
  }

  /**
   * Patches the `read` state of the news to the given value.
   * @remark Will do nothing if `this.read === status`.
   */
  public async markAsRead (status = true): Promise<void> {
    if (this.#read === status) return;

    await this.#client.patchNewsState(this.#stateInformation, [], {
      onlyMarkAsRead: true,
      markAsRead: status,
      delete: false
    });

    // Update local state.
    this.#read = status;
  }

  /**
   * Will delete the news from the user's news feed.
   * @remark You can never get the news back after this.
   */
  public async delete (): Promise<void> {
    await this.#client.patchNewsState(this.#stateInformation, [], {
      onlyMarkAsRead: false,
      markAsRead: false,
      delete: true
    });
  }

  /**
   * Low level method, used internally to patch questions (from `acknowledge()` and `answer()`).
   *
   * Most of the time, you won't need this.
   */
  public async patchQuestions (questions: StudentNewsItemQuestion[], alsoMarkAsRead = true): Promise<void> {
    await this.#client.patchNewsState(this.#stateInformation, questions, {
      markAsRead: alsoMarkAsRead,
      onlyMarkAsRead: false,
      delete: false
    });

    // Update local state.
    if (alsoMarkAsRead) this.#read = true;
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

  /**
   * Low level data about the public information of the user that'll send answers.
   * Used internally when sending answers to the server.
   *
   * Most of the time, you won't need this.
   */
  public get public (): PronoteApiNewsPublicSelf {
    return this.#public;
  }

  /**
   * Whether this news have been read or not.
   */
  public get read (): boolean {
    return this.#read;
  }
}

export class StudentNewsSurvey extends StudentNewsItem {
  readonly #questions: StudentNewsItemQuestion[];
  readonly #isAnonymous: boolean;

  constructor (client: Pronote, data: NewsItem, categories: StudentNewsCategory[]) {
    super(client, data, categories);

    this.#questions = data.listeQuestions.V.map((question) => new StudentNewsItemQuestion(client, question));
    this.#isAnonymous = data.reponseAnonyme;
  }

  /**
   * List of the questions contained in this survey.
   * You can answer them by reassigning the `answer` property.
   *
   * @example
   * question.answer = "[1..2]";
   */
  public get questions (): StudentNewsItemQuestion[] {
    return this.#questions;
  }

  /** Whether your response is anonymous or not. */
  public get isAnonymous (): boolean {
    return this.#isAnonymous;
  }

  /**
   * Answers the survey with the given answers.
   * By default, it'll answer with the questions that were given when the survey was created.
   *
   * You can either manipulate the questions directly or pass in your own answers.
   */
  public async answer (answers = this.#questions, alsoMarkAsRead = true): Promise<void> {
    return this.patchQuestions(answers, alsoMarkAsRead);
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

  #selectedAnswers?: number[];
  #textInputAnswer?: string;

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

    if (this.#answered && data.reponse.V.valeurReponse) {
      if (typeof data.reponse.V.valeurReponse === "string") {
        this.#textInputAnswer = data.reponse.V.valeurReponse;
      }
      else {
        this.#selectedAnswers = parseSelection(data.reponse.V.valeurReponse.V);
        this.#textInputAnswer = data.reponse.V.valeurReponseLibre;
      }
    }
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

  public get selectedAnswers (): number[] | undefined {
    return this.#selectedAnswers;
  }

  public get textInputAnswer (): string | undefined {
    return this.#textInputAnswer;
  }

  public patch (textInputAnswer?: string): void;
  public patch (selectedAnswers?: number[], otherFieldTextValue?: string): void;
  public patch (answers?: number[] | string, textInput?: string): void {
    if (this.#type === PronoteApiNewsQuestionType.TextInput || this.type === PronoteApiNewsQuestionType.InformationText) {
      this.#textInputAnswer = answers as string | undefined;
    }
    else {
      this.#selectedAnswers = answers as number[] | undefined;
      this.#textInputAnswer = textInput;
    }

    this.#answered = typeof answers !== "undefined";
    this.#answerDate = this.#answered ? new Date() : undefined;
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
  readonly #question: StudentNewsItemQuestion;

  constructor (client: Pronote, data: NewsItem, categories: StudentNewsCategory[]) {
    super(client, data, categories);

    this.#question = new StudentNewsItemQuestion(client, data.listeQuestions.V[0]);
  }

  /**
   * Will acknowledge the news if needed,
   * so if the news doesn't need to be acknowledged (`!needToAcknowledge`)
   * or is already `acknowledged`, we will just do the read step.
   *
   * When acknowledging, the news will be directly marked as read.
   * If you want to change this behavior, you can change the `alsoMarkAsRead` parameter.
   *
   * @remark You can't un-acknowledge a news.
   */
  public async acknowledge (alsoMarkAsRead = true): Promise<void> {
    if (!this.needToAcknowledge || this.acknowledged) return this.markAsRead(alsoMarkAsRead);

    // An empty string is needed to acknowledge.
    this.#question.patch("");

    return this.patchQuestions([this.#question], alsoMarkAsRead);
  }

  public get attachments (): StudentAttachment[] {
    return this.#question.attachments;
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

  /**
   * Low level data about the "question" contained inside this information.
   *
   * You can use this to serialize the question and
   * finally send it back to the server using `pronote.patchNewsState(data, [question], extra)`.
   *
   * Internally, `acknowledged`, `content`, `attachments`, ... are based on this,
   * we're just renaming the properties and adding some sugar on top of it.
   *
   * @remark Most of the time, you won't need this, but it's here if you need it.
   */
  public get question (): StudentNewsItemQuestion {
    return this.#question;
  }
}
