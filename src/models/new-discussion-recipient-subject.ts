import type { NewDiscussionRecipientSubSubject } from "./new-discussion-recipient-sub-subject";

export type NewDiscussionRecipientSubject = Readonly<{
  id: string;
  name: string;
  sub: Array<NewDiscussionRecipientSubSubject>
}>;
