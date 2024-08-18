export type UserAuthorizations = Readonly<{
  /**
   * Whether the user is allowed to read discussions.
   */
  canReadDiscussions: boolean
  /**
   * Whether the user is allowed to create messages in discussions.
   */
  canDiscuss: boolean
  /**
   * Whether the user is allowed to discuss with staff.
   */
  canDiscussWithStaff: boolean
  /**
   * Whether the user is allowed to discuss with parents.
   */
  canDiscussWithParents: boolean
  /**
   * Whether the user is allowed to discuss with students.
   */
  canDiscussWithStudents: boolean
  /**
   * Whether the user is allowed to discuss with teachers.
   */
  canDiscussWithTeachers: boolean
  /**
   * Whether the user is allowed to send HTML through discussions.
   * Otherwise the user should send plain text.
  */
  hasAdvancedDiscussionEditor: boolean
  /**
   * The maximum file size allowed for homework uploads.
   * @example 4194304 // for 4MB.
   */
  maxHomeworkFileUploadSize: boolean
}>;
