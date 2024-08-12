import { type Fetcher, defaultFetcher } from "@literate.ink/utilities";
import { decodeGeolocatedInstance } from "~/decoders/geolocated-instance";
import type { GeolocatedInstance } from "~/models";

export const geolocation = async (position: {
  latitude: number
  longitude: number
}, fetcher: Fetcher = defaultFetcher): Promise<Array<GeolocatedInstance>> => {
  const body = `data={"nomFonction":"geoLoc","lat":"${position.latitude}","long":"${position.longitude}"}`;

  const response = await fetcher({
    url: new URL("https://www.index-education.com/swie/geoloc.php"),
    method: "POST",
    content: body,
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
  });

  if (response.content === "{}") return [];
  const instances = JSON.parse(response.content);

  // Also apply haversine distance calculation.
  const output: Array<GeolocatedInstance> = instances.map((instance: unknown) =>
    decodeGeolocatedInstance(instance, [position.latitude, position.longitude])
  );

  // Apply PRONOTE sorting they use in their mobile app.
  output.sort((a, b) => a.distance > b.distance
    ? 1
    : a.distance < b.distance
      ? -1
      : a.name > b.name
        ? 1
        : a.name < b.name
          ? -1
          : 0
  );

  return output;
};
