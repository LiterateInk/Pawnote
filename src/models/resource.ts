import type { ResourceContent } from "./resource-content";
import type { Subject } from "./subject";

export type Resource = Readonly<{
  id: string;
  startDate: Date;
  endDate: Date;
  subject: Subject;

  haveAssignment: boolean;
  assignmentDeadline?: Date;

  /** Color of the resource in HEX. */
  backgroundColor: string;
  contents: Array<ResourceContent>;
  teachers: string[];
  groups: string[];
}>;
