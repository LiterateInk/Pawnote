use crate::{api::geolocate_instances_nearby::{build_request, parse_response}, models::InstanceNearby};
use literateink_utilities::{ Request, Response };
use std::future::Future;

async fn geolocate_instances_nearby_base<F, Fut>(
  latitude: f32,
  longitude: f32,
  fetcher: F
) -> Vec<InstanceNearby>
where
  F: Fn(Request) -> Fut,
  Fut: Future<Output = Result<Response, String>>,
{
  let response = fetcher(build_request(latitude, longitude)).await.unwrap();
  parse_response(response)
}

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*; 

#[cfg(target_arch = "wasm32")]
#[derive(serde::Serialize, tsify::Tsify, literateink_utilities_macros::TsifyAsync)]
#[tsify(into_wasm_abi)]
pub struct InstanceNearbyCollection(Vec<InstanceNearby>);

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub async fn geolocate_instances_nearby(
  latitude: f32,
  longitude: f32,
  fetcher: &js_sys::Function
) -> InstanceNearbyCollection {
  InstanceNearbyCollection(geolocate_instances_nearby_base(
    latitude,
    longitude,
    literateink_utilities::wasm_wrap_fetcher(fetcher)
  ).await)
}

#[cfg(not(target_arch = "wasm32"))]
pub async fn geolocate_instances_nearby(
  latitude: f32,
  longitude: f32,
) -> Vec<InstanceNearby> {
  geolocate_instances_nearby_base(
    latitude,
    longitude,
    literateink_utilities::reqwest_fetcher
  ).await
}
