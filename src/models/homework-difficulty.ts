export const HomeworkDifficulty = {
  None: 0,
  Easy: 1,
  Medium: 2,
  Hard: 3
} as const;

export type HomeworkDifficulty = typeof HomeworkDifficulty[keyof typeof HomeworkDifficulty];
