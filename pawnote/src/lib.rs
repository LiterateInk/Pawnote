use std::future::Future;
use utilities::{Request, Response};
use models::Session;

mod api;

pub mod models;
pub mod helpers;
pub mod constants;

pub use constants::WebSpace;

async fn authenticate_with_credentials_base<F, Fut>(
  pronote_url: String, 
  web_space: WebSpace,
  username: String, 
  password: String, 
  device_uuid: String, 
  fetcher: F
) -> Result<Session, String>
where
  F: Fn(Request) -> Fut,
  Fut: Future<Output = Result<Response, String>>,
{
  // 1. initialize URLs
  let pronote_root_url = helpers::pronote_url::to_root(pronote_url);
  let mut pronote_url = pronote_root_url.clone();
  pronote_url.push('/');
  pronote_url.push_str(web_space.to_path().as_str());
  pronote_url.push_str("?fd=1&bydlg=A6ABB224-12DD-4E31-AD3E-8A39A1C2C335&login=true");

  // 2. create a PRONOTE session
  let response = fetcher(api::create_pronote_session::build_request(pronote_url)).await?;
  let pronote_session = api::create_pronote_session::parse_response(response);

  let session = Session::new(pronote_root_url, pronote_session);
  
  _ = username;
  _ = password;
  _ = device_uuid;

  Ok(session)
}

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub async fn authenticate_with_credentials(
  pronote_url: String, 
  web_space: WebSpace,
  username: String, 
  password: String, 
  device_uuid: String, 
  fetcher: &js_sys::Function
) -> Result<Session, String> {
  authenticate_with_credentials_base(
    pronote_url,
    web_space,
    username, 
    password, 
    device_uuid,
    utilities::wasm_wrap_fetcher(fetcher)
  ).await
}

#[cfg(not(target_arch = "wasm32"))]
pub async fn authenticate_with_credentials(
  pronote_url: String, 
  web_space: WebSpace,
  username: String, 
  password: String, 
  device_uuid: String,
) -> Result<Session, String> {
  authenticate_with_credentials_base(
    pronote_url,
    web_space,
    username, 
    password, 
    device_uuid,
    utilities::reqwest_fetcher
  ).await
}