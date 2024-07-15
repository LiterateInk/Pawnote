use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn retrieve_pronote_root_url(pronote_url: String) -> String {
  pawnote::retrieve_pronote_root_url(pronote_url)
}
