use serde_repr::*;
use wasm_bindgen::prelude::*;

#[derive(Serialize_repr, Deserialize_repr, PartialEq, Default, Clone, Debug)]
#[wasm_bindgen]
#[repr(u8)]
pub enum SessionAccessType {
  #[default]
  Account,
  AccountConnection,
  DirectConnection,
  TokenAccountConnection,
  TokenDirectConnection,
  CookieConnection,
}
