import type { Attachment } from "./attachment";
import type { AssignmentReturnKind } from "./assignment-return-kind";

export type AssignmentReturn = {
  readonly kind: AssignmentReturnKind
  /**
   * File that the user uploaded.
   */
  uploaded?: Attachment
  /**
   * Whether the user can upload a file or not.
   */
  canUpload: boolean
  // NOTE: Not sure if we can block the upload once the user has uploaded a file (so the property updates from `true` to `false`)
  // If we cannot, then this should be readonly.
};
