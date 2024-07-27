use crate::api::instance_information::{build_request, parse_response};
use crate::models::InstanceInformation;
use literateink_utilities::{Request, Response};
use std::future::Future;

async fn get_instance_information_base<F, Fut>(
  pronote_root_url: String,
  fetcher: F,
) -> InstanceInformation
where
  F: Fn(Request) -> Fut,
  Fut: Future<Output = Result<Response, String>>,
{
  let response = fetcher(build_request(pronote_root_url)).await.unwrap();
  parse_response(response)
}

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub async fn get_instance_information(
  pronote_root_url: String,
  fetcher: &js_sys::Function,
) -> InstanceInformation {
  get_instance_information_base(
    pronote_root_url,
    literateink_utilities::wasm_wrap_fetcher(fetcher),
  )
  .await
}

#[cfg(not(target_arch = "wasm32"))]
pub async fn get_instance_information(pronote_root_url: String) -> InstanceInformation {
  get_instance_information_base(pronote_root_url, literateink_utilities::reqwest_fetcher).await
}
