use peak_alloc::PeakAlloc;
use pawnote::services::get_instance_information;

#[global_allocator]
static PEAK_ALLOC: PeakAlloc = PeakAlloc;

#[tokio::main]
async fn main() {
  let pronote_url = String::from("https://demo.index-education.net/pronote");
  let instance_information = get_instance_information(pronote_url).await;

  println!("{}", serde_json::to_string_pretty(&instance_information).unwrap());

  // We do a lil' memory usage check at the end.
  let peak_mem = PEAK_ALLOC.peak_usage_as_kb();
  let current_mem = PEAK_ALLOC.current_usage_as_kb();
	println!("This program currently uses {} KB of RAM, max was {} KB.", current_mem, peak_mem);
}
