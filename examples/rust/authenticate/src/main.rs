use peak_alloc::PeakAlloc;
use uuid::Uuid;

use pawnote::{
  WebSpace,
  authenticate_with_credentials
};

#[global_allocator]
static PEAK_ALLOC: PeakAlloc = PeakAlloc;

#[tokio::main]
async fn main() {
  let pronote_url = String::from("https://demo.index-education.net/pronote");
  let username = String::from("demonstration");
  let password = String::from("pronotevs");
  let device_uuid = Uuid::new_v4();

  let pronote_session = authenticate_with_credentials(
    pronote_url,
    WebSpace::Students,
    username,
    password,
    device_uuid.to_string()
  ).await.unwrap();

  println!("{}", serde_json::to_string_pretty(&pronote_session).unwrap());

  // We do a lil' memory usage check at the end.
  let peak_mem = PEAK_ALLOC.peak_usage_as_kb();
  let current_mem = PEAK_ALLOC.current_usage_as_kb();
	println!("This program currently uses {} KB of RAM, max was {} KB.", current_mem, peak_mem);
}
