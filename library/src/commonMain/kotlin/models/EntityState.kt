package models

enum class EntityState (val code: Int) {
    NONE(0),
    CREATION(1),
    MODIFICATION(2),
    DELETION(3),
    CHILDREN_MODIFICATION(4)
}