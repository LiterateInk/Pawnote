/// Pasted from <https://github.com/dcousens/haversine-distance/blob/00ed2643aa2082299f52f94eaa90a670bb3406b8/index.js>
/// and applied types directly in there.
/// EDIT: Removed `isArray` check since we'll only be using the object method.

// Equatorial mean radius of Earth, in meters.
const R = 6378137

// Helper functions.
const squared = (x: number): number => x * x;
const toRad   = (x: number): number => x * Math.PI / 180.0;
const hav     = (x: number): number => squared(Math.sin(x / 2));

export interface Position {
  latitude: number
  longitude: number
}

/**
 * Applies the following formula :
 * `hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLon - aLon)`
 * 
 * @returns Distance in meters.
 */
const haversine = (a: Position, b: Position): number => {
  const aLat = toRad(a.latitude);
  const bLat = toRad(b.latitude);
  const aLng = toRad(a.longitude);
  const bLng = toRad(b.longitude);

  const ht = hav(bLat - aLat) + Math.cos(aLat) * Math.cos(bLat) * hav(bLng - aLng);
  return 2 * R * Math.asin(Math.sqrt(ht));
}

export default haversine;
