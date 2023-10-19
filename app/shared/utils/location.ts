export type GeoPoint = {
  latitude: number;
  longitude: number;
};

/**
 * Constant for the earth radius in metres.
 */
const EARTH_RADIUS = 6371e3;

/**
 * Returns the distance between two points in metres.
 * @see https://www.movable-type.co.uk/scripts/latlong.html
 *
 * @description
 * This uses the haversine formula to calculate the distance
 * between two points.
 *  a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
 *  c = 2 ⋅ atan2( √a, √(1−a) )
 *  d = R ⋅ c
 * where
 *  φ is latitude,
 *  λ is longitude,
 *  R is earth’s radius (mean radius = 6,371km);
 * note that angles need to be in radians to pass to trig functions!
 *
 * @param {GeoPoint} point1
 * @param {GeoPoint} point2
 * @returns {number} distance in metres
 */
export function distance(point1: GeoPoint, point2: GeoPoint): number {
  const φ1 = (point1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = EARTH_RADIUS * c; // in metres

  return d;
}
