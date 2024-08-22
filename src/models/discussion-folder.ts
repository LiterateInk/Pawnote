import type { DiscussionFolderKind } from "./discussion-folder-kind";

export type DiscussionFolder = Readonly<{
  id: string
  name: string
  kind: DiscussionFolderKind
}>;
