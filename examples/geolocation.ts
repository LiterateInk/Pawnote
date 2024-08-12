import * as pronote from "../src";

void async function main () {
  const instances = await pronote.geolocation({
    latitude: 45.849998,
    longitude: 1.25
  });

  // Get the very first instance in the array.
  const firstInstanceFound = instances[0];
  console.log("Found", instances.length, "instances in the 20 km radius. Displaying the first instance...\n");

  // Output the information.
  console.log(firstInstanceFound.name, `(${firstInstanceFound.postalCode})`);
  console.log("=>", firstInstanceFound.url, "\n");

  const distanceInKM = parseFloat((firstInstanceFound.distance / 1000).toFixed(2));
  console.log(distanceInKM, "km from the given location.");
  console.log("Exactly located at longitude", firstInstanceFound.longitude, "and latitude", firstInstanceFound.latitude);
}();
