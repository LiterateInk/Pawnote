package ink.literate.pawnote.models.errors

class DiscussionActionError : Error("You can't send a message or a draft in this discussion")

class DiscussionMessagesMissingError : Error("You should request messages before sending anything")
