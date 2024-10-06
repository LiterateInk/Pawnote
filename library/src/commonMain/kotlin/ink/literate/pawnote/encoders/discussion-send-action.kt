package ink.literate.pawnote.encoders

import ink.literate.pawnote.models.DiscussionSendAction

fun encodeDiscussionSendAction (action: DiscussionSendAction, includeParentsAndStudents: Boolean): DiscussionSendAction {
    var actionToSend: DiscussionSendAction = action

    if (
        action == DiscussionSendAction.SendEveryoneExceptParentsAndStudents &&
        includeParentsAndStudents
    ) actionToSend = DiscussionSendAction.SendEveryone

    if (
        action == DiscussionSendAction.ReplyEveryoneExceptParentsAndStudents &&
        includeParentsAndStudents
    ) actionToSend = DiscussionSendAction.ReplyEveryone

    return actionToSend
}