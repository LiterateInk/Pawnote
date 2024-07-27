use pawnote::services::get_instance_information;

#[tokio::main]
async fn main() {
  let pronote_url = String::from("https://demo.index-education.net/pronote");
  let instance_information = get_instance_information(pronote_url).await;

  println!("{}", serde_json::to_string_pretty(&instance_information).unwrap());
}
