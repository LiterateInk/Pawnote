package ink.literate.pawnote.models

data class TimetableClassDetention(
    val title: String? = null,
    val personalNames: List<String>,
    val teacherNames: List<String>,
    val classrooms: List<String>
) {
    val `is` = "detention"
}