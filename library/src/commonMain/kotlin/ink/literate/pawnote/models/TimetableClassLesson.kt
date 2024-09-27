package ink.literate.pawnote.models

data class TimetableClassLesson(
    val kind: Int,
    /**
     * @example "Classe absente"
     */
    val status: String? = null,
    /**
     * Whether this lesson has been canceled or not.
     */
    val canceled: Boolean,
    /**
     * Whether the user is exempted from this lesson or not.
     */
    val exempted: Boolean,
    /**
     * Whether there will be a test in the lesson or not.
     */
    val test: Boolean,

    /**
     * List of URLs for virtual classrooms.
     */
    val virtualClassrooms: List<String>,
    /**
     * List of personal names
     */
    val personalNames: List<String>,
    /**
     * List of teacher names
     */
    val teacherNames: List<String>,
    /**
     * List of classrooms
     */
    val classrooms: List<String>,
    /**
     * List of group names
     */
    val groupNames: List<String>,

    /**
     * Subject of the lesson
     */
    val subject: Subject? = null,

    /**
     * Returns `null` when there's no resource attached to this lesson.
     * Otherwise, it'll return an ID that can be used in `lessonResource()` method.
     */
    val lessonResourceID: String? = null
) {
    val `is` = "lesson"
}