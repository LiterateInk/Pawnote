import type { EntityKind } from "./entity-kind";
import type { NewDiscussionRecipientFunction } from "./new-discussion-recipient-function";
import type { NewDiscussionRecipientSubject } from "./new-discussion-recipient-subject";

export type NewDiscussionRecipient = Readonly<{
  name: string;
  kind: typeof EntityKind.Teacher | typeof EntityKind.Student | typeof EntityKind.Personal;
  id: string;
  isPrincipal: boolean;
  subjects: Array<NewDiscussionRecipientSubject>;
  function?: NewDiscussionRecipientFunction;
}>;
