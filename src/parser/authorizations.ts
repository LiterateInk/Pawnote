import type { ApiUserData } from "~/api";

class Authorizations {
  readonly #canDiscuss: boolean;

  readonly #canDiscussWithStaff: boolean;
  readonly #canDiscussWithParents: boolean;
  readonly #canDiscussWithStudents: boolean;
  readonly #canDiscussWithTeachers: boolean;

  readonly #hasAdvancedDiscussionEditor: boolean;

  constructor (data: ApiUserData["output"]["data"]["donnees"]["autorisations"]) {
    this.#canDiscuss = (data.AvecDiscussion ?? false) && !(data.discussionInterdit ?? false);

    this.#canDiscussWithStaff = this.#canDiscuss && (data.AvecDiscussionPersonnels ?? false);
    this.#canDiscussWithParents = this.#canDiscuss && (data.AvecDiscussionParents ?? false);
    this.#canDiscussWithStudents = this.#canDiscuss && (data.AvecDiscussionEleves ?? false);
    this.#canDiscussWithTeachers = this.#canDiscuss && (data.AvecDiscussionProfesseurs ?? false);

    this.#hasAdvancedDiscussionEditor = data.AvecDiscussionAvancee ?? false;
  }

  /**
   * Whether the user is allowed to discuss.
   */
  public get canDiscuss (): boolean {
    return this.#canDiscuss;
  }

  /**
   * Whether the user is allowed to discuss with staff.
   */
  public get canDiscussWithStaff (): boolean {
    return this.#canDiscussWithStaff;
  }

  /**
   * Whether the user is allowed to discuss with parents.
   */
  public get canDiscussWithParents (): boolean {
    return this.#canDiscussWithParents;
  }

  /**
   * Whether the user is allowed to discuss with students.
   */
  public get canDiscussWithStudents (): boolean {
    return this.#canDiscussWithStudents;
  }

  /**
   * Whether the user is allowed to discuss with teachers.
   */
  public get canDiscussWithTeachers (): boolean {
    return this.#canDiscussWithTeachers;
  }

  /**
   * Whether the user is allowed to send HTML through discussions.
   * Otherwise the user should send plain text.
  */
  public get hasAdvancedDiscussionEditor (): boolean {
    return this.#hasAdvancedDiscussionEditor;
  }
}

export default Authorizations;

