import { load_async, geolocate_instances_nearby } from "pawnote";
await load_async();

let instances = await geolocate_instances_nearby(45.85, 1.25);
for (const instance of instances) {
  console.log("Instance:", instance.name);
  console.log("Instance URL:", instance.url);
  console.log("Instance Distance:", instance.postal_code, "km");
}