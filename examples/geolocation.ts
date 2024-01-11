import { findPronoteInstances, type PronoteInstance } from "../src";

(async () => {
  const instances: Array<PronoteInstance> = await findPronoteInstances({
    latitude: 45.849998,
    longitude: 1.25
  });

  // Get the very first instance in the array.
  const firstInstanceFound: PronoteInstance = instances[0];
  console.log("Found", instances.length, "instances in the 20 km radius. Displaying the first instance...\n");

  // Output the information.
  console.log(firstInstanceFound.name, `(${firstInstanceFound.postalCode})`);
  console.log(firstInstanceFound.url);

  const distanceInKM = parseFloat((firstInstanceFound.distance / 1000).toFixed(2));
  console.log(distanceInKM, "km from the given location.");
  console.log("Exactly located at longitude", firstInstanceFound.longitude, "and latitude", firstInstanceFound.latitude);
})();
