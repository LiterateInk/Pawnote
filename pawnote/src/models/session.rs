use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

use super::PronoteSession;

#[derive(Serialize, Deserialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Session {
  /// Session created by PRONOTE when navigating on the web space
  /// for the first time. 
  pub pronote: PronoteSession
}

#[wasm_bindgen]
impl Session {
  #[wasm_bindgen(constructor)]
  pub fn new(pronote_session: PronoteSession) -> Self {
    Session {
      pronote: pronote_session
    }
  }
}
