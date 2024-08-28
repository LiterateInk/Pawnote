export class DiscussionActionError extends Error {
  constructor() {
    super("You can't send a message or a draft in this discussion");
    this.name = "DiscussionActionError";
  }
}

export class DiscussionMessagesMissingError extends Error {
  constructor() {
    super("You should request messages before sending anything");
    this.name = "DiscussionMessagesMissingError";
  }
}
