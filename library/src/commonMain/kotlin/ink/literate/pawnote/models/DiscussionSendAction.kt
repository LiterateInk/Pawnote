package ink.literate.pawnote.models

enum class DiscussionSendAction(val code: Int) {
  Send(0),
  SendEveryone(1),
  SendEveryoneExceptParentsAndStudents(3),
  ReplyEveryone(2),
  ReplyEveryoneExceptParentsAndStudents(4),
  Close(5);

  companion object {
    fun fromInt(code: Int) = entries.first { it.code == code }
  }
}
