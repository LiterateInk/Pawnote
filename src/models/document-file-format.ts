export const DocumentFileFormat = {
  UNKNOWN: 0,
  TEXT: 1,
  PDF: 2,
  EXCEL: 3,
  ARCHIVE: 4,
  IMAGE: 5,
  SOUND: 6,
  VIDEO: 7,
  DIAPORAMA: 8,
  GEOGEBRA: 9
} as const;

export type DocumentFileFormat = typeof DocumentFileFormat[keyof typeof DocumentFileFormat];
