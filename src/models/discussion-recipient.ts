import { EntityKind } from "./entity-kind";

export type DiscussionRecipient = Readonly<{
  id: string
  name: string;
  kind: typeof EntityKind.Teacher | typeof EntityKind.Student | typeof EntityKind.Personal;
  disallowMessages: boolean;
}>;
