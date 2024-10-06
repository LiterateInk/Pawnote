package ink.literate.pawnote.api

import ink.literate.pawnote.api.helpers.clearURL
import kotlin.test.Test
import kotlin.test.assertEquals

class ClearURLTest {

  @Test
  fun `test clearURL`() {
    val testURL = "https://demo.index-education.net/pronote/eleve.html"
    assertEquals("https://demo.index-education.net/pronote", clearURL(testURL))
  }
}
