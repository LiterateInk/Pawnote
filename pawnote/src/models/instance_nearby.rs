use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use crate::helpers::deserializer::{ parse_float, parse_u32, trim_string };

#[derive(Serialize, Deserialize, Clone, Debug)]
#[wasm_bindgen(getter_with_clone)]
pub struct InstanceNearby {
  pub url: String,  
  #[serde(rename(deserialize = "nomEtab"), deserialize_with = "trim_string")]
  pub name: String,
  #[serde(rename(deserialize = "lat"), deserialize_with = "parse_float")]
  pub latitude: f32,
  #[serde(rename(deserialize = "long"), deserialize_with = "parse_float")]
  pub longitude: f32,
  #[serde(rename(deserialize = "cp"), deserialize_with = "parse_u32")]
  pub postal_code: u32
}
