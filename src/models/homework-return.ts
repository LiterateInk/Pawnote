import type { Attachment } from "./attachment";
import type { HomeworkReturnKind } from "./homework-return-kind";

export type HomeworkReturn = {
  readonly kind: HomeworkReturnKind
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
