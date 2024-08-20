export const HomeworkReturnKind = {
  None: 0,
  Paper: 1,
  FileUpload: 2,
  Kiosk: 3,

  /** Only available since version 2024. */
  AudioRecording: 4
} as const;

export type HomeworkReturnKind = typeof HomeworkReturnKind[keyof typeof HomeworkReturnKind];
