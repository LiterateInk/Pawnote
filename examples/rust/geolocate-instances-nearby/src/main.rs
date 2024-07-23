use peak_alloc::PeakAlloc;
use pawnote::services::geolocate_instances_nearby;

#[global_allocator]
static PEAK_ALLOC: PeakAlloc = PeakAlloc;

#[tokio::main]
async fn main() {
  // Use the coordinates of Limoges, a few instances should be there.
  let instances = geolocate_instances_nearby(45.85, 1.25).await;
  println!("{}", serde_json::to_string_pretty(&instances).unwrap());

  // Let's use a completely random location, no instances should be there.
  let instances = geolocate_instances_nearby(6.9, 4.20).await;
  println!("{}", serde_json::to_string_pretty(&instances).unwrap());

  // We do a lil' memory usage check at the end.
  let peak_mem = PEAK_ALLOC.peak_usage_as_kb();
  let current_mem = PEAK_ALLOC.current_usage_as_kb();
	println!("This program currently uses {} KB of RAM, max was {} KB.", current_mem, peak_mem);
}
