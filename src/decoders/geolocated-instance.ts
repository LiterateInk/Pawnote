import type { GeolocatedInstance } from "~/models";
import { haversine } from "~/core/haversine";

export const decodeGeolocatedInstance = (instance: any, position: [lat: number, lon: number]): GeolocatedInstance => {
  const latitude = parseFloat(instance.lat);
  const longitude = parseFloat(instance.long);

  return {
    url: instance.url.toLowerCase(),
    name: instance.nomEtab
      .trim()
      .replace("COLLEGE", "COLLÈGE")
      .replace("LYCEE", "LYCÉE"),

    latitude, longitude,
    postalCode: parseInt(instance.cp),

    distance: haversine(position, [latitude, longitude])
  };
};
