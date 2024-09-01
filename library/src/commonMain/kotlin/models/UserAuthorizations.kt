package models

data class UserAuthorizations(
    val canReadDiscussions: Boolean,
    val canDiscuss: Boolean,
    val canDiscussWithStaff: Boolean,
    val canDiscussWithParents: Boolean,
    val canDiscussWithStudents: Boolean,
    val canDiscussWithTeachers: Boolean,
    val hasAdvancedDiscussionEditor: Boolean,
    val maxAssignmentFileUploadSize: Long,
    val tabs: List<TabLocation>
)
