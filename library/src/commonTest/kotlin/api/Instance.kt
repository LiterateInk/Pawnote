package api

import kotlinx.coroutines.runBlocking
import kotlin.test.Test
import kotlin.test.assertTrue

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