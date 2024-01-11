export interface PronoteApiGeolocation {
  request: {
    nomFonction: "geoLoc"
    lat: string
    long: string
  }

  response: Array<{
    url: string
    nomEtab: string
    lat: string
    long: string
    cp: string
  }> | Record<string, unknown> // `{}` when no results.
}

export interface ApiGeolocation {
  input: {
    latitude: number,
    longitude: number
  }

  output: Array<{
    url: string
    name: string
    latitude: number
    longitude: number
    postalCode: number
    /** Distance in meters. */
    distance: number
  }>
}