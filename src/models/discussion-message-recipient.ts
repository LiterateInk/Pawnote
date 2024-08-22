import type { EntityKind } from "./entity-kind";

export type DiscussionMessageRecipient = Readonly<{
  name: string
  kind: EntityKind
}>;
