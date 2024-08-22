import type { NewDiscussionRecipient, NewDiscussionRecipientSubject, NewDiscussionRecipientSubSubject } from "~/models";
import { decodeNewDiscussionRecipientFunction } from "./new-discussion-recipient-function";
import { decodeNewDiscussionRecipientSubSubject } from "./new-discussion-recipient-sub-subject";
import { decodeNewDiscussionRecipientSubject } from "./new-discussion-recipient-subject";

export const decodeNewDiscussionRecipient = (recipient: any): NewDiscussionRecipient => {
  const subjects: NewDiscussionRecipientSubject[] = [];
  if (recipient.listeRessources) {
    const sub: NewDiscussionRecipientSubSubject[] = recipient.listeRessources.V
      .filter((r: any) => r.estUneSousMatiere)
      .map(decodeNewDiscussionRecipientSubSubject);

    for (const resource of recipient.listeRessources.V) {
      if (resource.estUneSousMatiere) continue;
      subjects.push(decodeNewDiscussionRecipientSubject(resource, sub.filter((s) => s.from === resource.L)));
    }
  }

  return {
    id: recipient.N,
    name: recipient.L,
    kind: recipient.G,

    subjects,
    function: recipient.fonction && decodeNewDiscussionRecipientFunction(recipient.fonction.V),
    isPrincipal: recipient.estPrincipal ?? false
  };
};
