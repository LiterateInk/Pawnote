use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn retrieve_pronote_root_url(pronote_url: String) -> String {
  pawnote::retrieve_pronote_root_url(pronote_url)
}

#[wasm_bindgen]
pub enum WebSpace {
  Students = 6,
  Parents = 7,
  Teachers = 8,
  Administration = 14,
  Management = 17,
  Assistants = 26
}

#[wasm_bindgen]
pub async fn authenticate_with_credentials(
  pronote_url: String, 
  web_space: WebSpace,
  username: String, 
  password: String, 
  device_uuid: String, 
  fetcher: &js_sys::Function
) -> Result<JsValue, String> {
  let fetcher = pawnote::utilities::wasm_wrap_fetcher(fetcher);

  // Call the pawnote authenticate function and handle the result
  let result = pawnote::authenticate_with_credentials(
    pronote_url,
    pawnote::WebSpace::from_id(web_space as u8).unwrap(),
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