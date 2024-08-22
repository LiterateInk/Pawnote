import { Discussion } from "./discussion";
import type { DiscussionFolder } from "./discussion-folder";

export type Discussions = Readonly<{
  folders: Array<DiscussionFolder>
  items: Array<Discussion>
}>;
