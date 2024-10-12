package ink.literate.pawnote.core

import kotlin.math.PI
import kotlin.math.asin
import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.sqrt

// Equatorial mean radius of Earth, in meters.
internal const val R = 6378137

// Helper functions

internal val squared: (x: Double) -> Double = { it * it }
internal val toRad: (x: Double) -> Double = { it * PI / 180 }
internal val hav: (x: Double) -> Double = { squared(sin(it / 2)) }

/**
 * Applies the following formula : `hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) *
 * hav(bLon - aLon)`
 *
 * @return Distance in meters.
 */
val haversine: (a: Pair<Double, Double>, b: Pair<Double, Double>) -> Double = { a, b ->
  val aLat = toRad(a.first)
  val bLat = toRad(b.first)
  val aLng = toRad(a.second)
  val bLng = toRad(b.second)

  val ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng)
  2 * R * asin(sqrt(ht))
}
