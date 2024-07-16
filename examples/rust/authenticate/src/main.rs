#[tokio::main]
async fn main() {
  println!("{}", pawnote::WebSpace::Students.to_path());

  let response = pawnote::authenticate_with_credentials(
    "https://google.com".to_string(),
    pawnote::WebSpace::Students,
    "username".to_string(),
    "password".to_string(),
    "device_uuid".to_string(),
    pawnote::utilities::reqwest_fetcher
  ).await;

  match response {
    Ok(result) => {
      let headers_string = result.headers.iter().map(|(k, v)| format!("[ \"{}\", \"{}\" ]", k, v)).collect::<Vec<String>>().join(", ");
      println!("Async operation successful: {}", headers_string);
    },
    Err(err) => {
        eprintln!("Async operation failed: {}", err);
    }
  }
}
