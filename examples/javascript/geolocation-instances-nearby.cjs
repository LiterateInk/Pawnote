const { /* load_sync, */ load_async, geolocate_instances_nearby } = require("pawnote");
// load_sync(); // Load the WASM synchronously.

void async function main () {
  await load_async(); // Load the WASM asynchronously.

  let instances = await geolocate_instances_nearby(45.85, 1.25);
  for (const instance of instances) {
    console.log(instance.name);
    console.log(" | @", instance.url);
    console.log(" | ~", instance.postal_code, ":", `(${instance.latitude.toFixed(2)}, ${instance.longitude.toFixed(2)})`);
  }
}();
