use url::Url;
use std::future::Future;
use wasm_bindgen::prelude::*;

/// Quick access to `LiterateInk/Utilities` crate.
pub use utilities;

#[wasm_bindgen]
pub fn retrieve_pronote_root_url (pronote_url: String) -> String {
  let url = Url::parse(&pronote_url).unwrap();
  let origin = url.origin().ascii_serialization();
  let mut paths: Vec<&str> = url.path().split('/').collect();
  
  if let Some(last_path) = paths.last() {
    // Remove the last part of the path if ending with a ".json" or ".html".
    if last_path.ends_with(".json") || last_path.ends_with(".html") {
      let _ = paths.pop();
    }
  }

  // Remove empty paths (will also remove the first '/')
  paths.retain(|&x| !x.is_empty());

  // Join the paths back together ("pronote/eleve.html")
  let path_name = paths.join("/");

  if !path_name.is_empty() {
    // Put everything back, just add the '/' we removed
    // earlier before the actual path.
    origin + "/" + &path_name
  }
  else {
    // Path is the root, so no need to append it.
    origin
  }
}

#[wasm_bindgen]
pub enum WebSpace {
  Students = 6, // = Élèves
  
  /// This web space is currently not supported in Pawnote.
  Parents = 7,
  
  /// This web space is currently not supported in Pawnote.
  Teachers = 8, // = Professeurs

  /// This web space is currently not supported in Pawnote.
  Administration = 14, // = Vie Scolaire
  
  /// This web space is currently not supported in Pawnote.
  Management = 17, // = Direction
  
  /// This web space is currently not supported in Pawnote.
  Assistants = 26 // = Accompagnants
}

impl WebSpace {
  pub fn from_id (id: u8) -> Option<WebSpace> {
    match id {
      6 => Some(WebSpace::Students),
      7 => Some(WebSpace::Parents),
      8 => Some(WebSpace::Teachers),
      26 => Some(WebSpace::Assistants),
      14 => Some(WebSpace::Administration),
      17 => Some(WebSpace::Management),
      _ => None,
    }
  }

  pub fn to_path (&self) -> String {
    match self {
      WebSpace::Students => "mobile.eleve.html".into(),
      WebSpace::Parents => "mobile.parent.html".into(),
      WebSpace::Teachers => "mobile.professeur.html".into(),
      WebSpace::Assistants => "mobile.accompagnant.html".into(),
      WebSpace::Administration => "mobile.viescolaire.html".into(),
      WebSpace::Management => "mobile.direction.html".into(),
    }
  }
}

async fn authenticate_with_credentials_base<F, Fut>(
  pronote_url: String, 
  web_space: WebSpace,
  username: String, 
  password: String, 
  device_uuid: String, 
  fetcher: F
) -> Result<utilities::Response, String>
where
  F: Fn(utilities::Request) -> Fut,
  Fut: Future<Output = Result<utilities::Response, String>>,
{
  let root_url = retrieve_pronote_root_url(pronote_url);
  let response = fetcher(utilities::Request {
    url: root_url,
    method: "GET".into(),
    content: None,
    headers: vec![]
  }).await?;

  _ = web_space;
  _ = username;
  _ = password;
  _ = device_uuid;
  
  Ok(response)
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = authenticate_with_credentials)]
pub async fn authenticate_with_credentials_wasm(
  pronote_url: String, 
  web_space: WebSpace,
  username: String, 
  password: String, 
  device_uuid: String, 
  fetcher: &js_sys::Function
) -> Result<JsValue, String> {
  let fetcher = utilities::wasm_wrap_fetcher(fetcher);

  // Call the pawnote authenticate function and handle the result
  let result = authenticate_with_credentials_base(
    pronote_url,
    WebSpace::from_id(web_space as u8).unwrap(),
    username, 
    password, 
    device_uuid,
    fetcher
  ).await;

  match result {
    Ok(response) => Ok(serde_wasm_bindgen::to_value(&response).unwrap()),
    Err(err) => Err(err)
  }
}

#[cfg(not(target_arch = "wasm32"))]
pub async fn authenticate_with_credentials(
  pronote_url: String, 
  web_space: WebSpace,
  username: String, 
  password: String, 
  device_uuid: String,
) -> Result<utilities::Response, String> {
  authenticate_with_credentials_base(
    pronote_url,
    WebSpace::from_id(web_space as u8).unwrap(),
    username, 
    password, 
    device_uuid,
    utilities::reqwest_fetcher
  ).await
}