import type { PronoteApiResourceType } from "./resources";

export type PronoteApiUserResourceType = (
  | PronoteApiResourceType.Teacher
  | PronoteApiResourceType.Student
  | PronoteApiResourceType.Personal
);
