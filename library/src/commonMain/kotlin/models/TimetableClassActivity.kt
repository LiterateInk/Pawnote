package models

data class TimetableClassActivity(
    val title: String,
    val attendants: List<String>,
    val resourceTypeName: String,
    val resourceValue: String
) {
    val `is` = "activity"
}
