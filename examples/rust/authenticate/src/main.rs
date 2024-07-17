#[tokio::main]
async fn main() {
  let response = pawnote::authenticate_with_credentials(
    String::from("https://demo.index-education.net/pronote"),
    pawnote::WebSpace::Students,
    String::from("demonstration"),
    String::from("pronotevs"),
    String::from("device-uuid")
  ).await;

  match response {
    Ok(result) => {
      println!("{}", serde_json::to_string_pretty(&result).unwrap());
    },
    Err(err) => {
        eprintln!("Async operation failed: {}", err);
    }
  }
}
