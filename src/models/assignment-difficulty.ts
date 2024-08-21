export const AssignmentDifficulty = {
  None: 0,
  Easy: 1,
  Medium: 2,
  Hard: 3
} as const;

export type AssignmentDifficulty = typeof AssignmentDifficulty[keyof typeof AssignmentDifficulty];
