#[tokio::main]
async fn main() {
  println!("{}", pawnote::WebSpace::Students.to_path());

  let response = pawnote::authenticate_with_credentials(
    "https://demo.index-education.net/pronote".to_string(),
    pawnote::WebSpace::Students,
    "username".to_string(),
    "password".to_string(),
    "device_uuid".to_string()
  ).await;

  match response {
    Ok(result) => {
      println!("Async operation successful: {}", result.content);
    },
    Err(err) => {
        eprintln!("Async operation failed: {}", err);
    }
  }
}
