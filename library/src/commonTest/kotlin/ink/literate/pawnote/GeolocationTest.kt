package ink.literate.pawnote

import ink.literate.pawnote.api.geolocation
import ink.literate.pawnote.models.Position

import kotlinx.coroutines.runBlocking
import kotlin.test.Test
import kotlin.test.assertTrue

class GeolocationTest {

    @Test
    fun `test geolocation`() {
        runBlocking {
            val position = Position(
                latitude = 50.614843,
                longitude = 3.0784157
            )

            val instances = geolocation(position)

            println(instances)

            assertTrue { true }
        }
    }
}