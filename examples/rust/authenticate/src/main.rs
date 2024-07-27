use pawnote::{authenticate_with_credentials, Webspace};
use uuid::Uuid;

#[tokio::main]
async fn main() {
  let pronote_url = String::from("https://demo.index-education.net/pronote");
  let username = String::from("demonstration");
  let password = String::from("pronotevs");
  let device_uuid = Uuid::new_v4();

  let session = authenticate_with_credentials(
    pronote_url,
    Webspace::Students,
    username,
    password,
    device_uuid.to_string(),
  )
  .await
  .unwrap();

  println!("{}", serde_json::to_string_pretty(&session).unwrap());
}
