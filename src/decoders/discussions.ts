import type { Discussion, DiscussionFolder, Discussions, SessionHandle } from "~/models";
import { decodeDiscussionFolder } from "./discussion-folder";
import { decodeDiscussion } from "./discussion";

export const decodeDiscussions = (discussions: any): Discussions => {
  const folders: DiscussionFolder[] = discussions.listeEtiquettes.V.map(decodeDiscussionFolder);

  const items: Discussion[] = discussions.listeMessagerie.V
    .filter((discussion: any) => {
      const hasZeroDepth = (discussion.profondeur || 0) === 0;
      const hasParticipants = discussion.messagePourParticipants?.V.N;
      return discussion.estUneDiscussion && hasParticipants && hasZeroDepth;
    })
    .map((discussion: any) => decodeDiscussion(discussion, folders));

  return {
    items,
    folders
  };
};
