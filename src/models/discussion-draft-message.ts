export type DiscussionDraftMessage = Readonly<{
  isHTML: boolean
  posessionID: string
  replyMessageID: string
}> & {
  content: string
};
