export type DiscussionDraftMessage = Readonly<{
  isHTML: boolean
  possessionID: string
  replyMessageID: string
}> & {
  content: string
};
