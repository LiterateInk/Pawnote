package ink.literate.pawnote.api.helpers

/**
 * Defaults to `-1000`, used to generate IDs for newly created objects. Whenever an object is
 * created using this ID, it should be decremented by `1`.
 */
var id = -1000

fun createEntityID(): Int {
  id -= 1
  return id
}
