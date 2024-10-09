package ink.literate.pawnote.api

import kotlin.test.Test
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking

class InstanceTest {
  @Test
  fun `test instance`() {
    runBlocking {
      val instance = instance("https://demo.index-education.net/pronote/eleve.html")

      println(instance)

      assertTrue { true }
    }
  }
}
