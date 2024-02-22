/**
 * Required when building an URL to download a file
 * attached to a grade.
 *
 * @remark Shouldn't be exported as it's only used internally.
 */
export enum PronoteApiGradeAttachmentType {
  CorrectionFile = "DevoirCorrige",
  SubjectFile = "DevoirSujet"
}
