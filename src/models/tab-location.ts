export const TabLocation = {
  Grades: 198,
  Resources: 89,
  Homework: 88,
  Timetable: 16,
  Evaluations: 201,
  Account: 49,
  Presence: 7,
  News: 8,
  Notebook: 19,
  Discussions: 131,
  GradesReport: 13
} as const;

export type TabLocation = typeof TabLocation[keyof typeof TabLocation];
