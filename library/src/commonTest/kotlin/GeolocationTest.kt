import api.geolocation
import kotlinx.coroutines.runBlocking
import models.Position
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