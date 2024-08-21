import type { Discussions, SessionHandle } from "~/models";
import { decodeDiscussionFolder } from "./discussion-folder";
import { decodeDiscussion } from "./discussion";

export const decodeDiscussions = (discussions: any, session: SessionHandle): Discussions => {
  const folders = discussions.listeEtiquettes.V.map(decodeDiscussionFolder);

  return {
    items: discussions.listeMessagerie.V.map((discussion: any) => decodeDiscussion(discussion, session, folders)),
    folders
  };
};
