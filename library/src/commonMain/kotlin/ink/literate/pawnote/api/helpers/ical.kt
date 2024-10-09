package ink.literate.pawnote.api.helpers

import ink.literate.pawnote.models.SessionHandle

fun timetableICalURL(
    session: SessionHandle,
    iCalToken: String,
    fileName: String = "timetable"
): String {
  val version = session.instance.version.joinToString(".")
  return "${session.information.url}/ical/${fileName}.ics?icalsecurise=${iCalToken}&version=${version}&param=266f3d32"
}
