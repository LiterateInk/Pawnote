import type { DiscussionFolder } from "~/models";

export const decodeDiscussionFolder = (folder: any): DiscussionFolder => {
  return { // just an entity
    id: folder.N,
    name: folder.L,
    kind: folder.G
  };
};
