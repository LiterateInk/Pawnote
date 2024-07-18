use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

use super::SessionInformation;

#[derive(Serialize, Deserialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Session {
  /// PRONOTE root URL.
  pub root_url: String,

  /// Issued when navigating on the web space
  /// for the first time. 
  pub information: SessionInformation
}

#[wasm_bindgen]
impl Session {
  #[wasm_bindgen(constructor)]
  pub fn new(pronote_root_url: String, session_information: SessionInformation) -> Self {
    Session {
      root_url: pronote_root_url,
      information: session_information
    }
  }
}
