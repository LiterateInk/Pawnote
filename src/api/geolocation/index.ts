import type { PronoteApiGeolocation, ApiGeolocation } from "./types";

import { PRONOTE_GEOLOCATION_URL } from "~/constants/urls";

import haversine from "~/utils/haversine";
import { decode } from "html-entities";
import { makeApiHandler } from "~/utils/api";
import { MOBILE_CHROME_USER_AGENT } from "~/constants/user-agent";

/** Gives every Pronote instance in a 20km radius of the given `longitude` and `latitude`. */
export const callApiGeolocation = makeApiHandler<ApiGeolocation>(async (fetcher, input) => {
  const request_body: PronoteApiGeolocation["request"] = {
    nomFonction: "geoLoc",
    lat: input.latitude.toString(),
    long: input.longitude.toString()
  };

  const searchParamsBody = new URLSearchParams();
  searchParamsBody.set("data", JSON.stringify(request_body));

  const response = await fetcher(PRONOTE_GEOLOCATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "User-Agent": MOBILE_CHROME_USER_AGENT
    },
    body: searchParamsBody.toString()
  });

  let data = await response.json<PronoteApiGeolocation["response"]>();
  data = Array.isArray(data) ? data : [];

  // Restructure the results to be more readable.
  const results: ApiGeolocation["output"] = data.map((result) => ({
    url: result.url.toLowerCase(),
    name: decode(result.nomEtab) // Use UTF8 instead of HTML entities encoding.
      .replace("COLLEGE", "COLLÈGE")
      .replace("LYCEE", "LYCÉE")
      .trim(), // Prevent some `\r\n` at the end of some strings.

    latitude: parseFloat(result.lat),
    longitude: parseFloat(result.long),

    postalCode: parseInt(result.cp),

    distance: haversine(
      { latitude: input.latitude, longitude: input.longitude },
      { latitude: parseFloat(result.lat), longitude: parseFloat(result.long) }
    )
  }))
    // Sort the distance by the nearest and also by school's name.
    .sort((a, b) => a.distance > b.distance
      ? 1
      : a.distance < b.distance
        ? -1
        : a.name > b.name
          ? 1
          : a.name < b.name
            ? -1
            : 0
    );

  return results;
});
