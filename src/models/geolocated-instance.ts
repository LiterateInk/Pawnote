export type GeolocatedInstance = Readonly<{
  url: string
  name: string
  latitude: number
  longitude: number
  postalCode: number
  distance: number
}>;
