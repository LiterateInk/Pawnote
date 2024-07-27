use pawnote::services::geolocate_instances_nearby;

#[tokio::main]
async fn main() {
  // Use the coordinates of Limoges, a few instances should be there.
  let instances = geolocate_instances_nearby(45.85, 1.25).await;
  println!("{}", serde_json::to_string_pretty(&instances).unwrap());

  // Let's use a completely random location, no instances should be there.
  let instances = geolocate_instances_nearby(6.9, 4.20).await;
  println!("{}", serde_json::to_string_pretty(&instances).unwrap());
}
