use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use crate::constants::{Webspace, SessionAccessType};

#[derive(Serialize, Deserialize, Clone)]
#[wasm_bindgen(getter_with_clone)]
pub struct SessionInformation {
  /// Session ID as a string, needs to be converted to a number
  /// for easier usage within API requests later.
  #[serde(rename(deserialize = "h"))]
  pub id: String,

  /// Web space ID as a number.
  #[serde(rename(deserialize = "a"))]
  pub web_space: Webspace,
  
  /// Whether the instance is demo or not.
  #[serde(rename(deserialize = "d"), default)]
  pub demo: bool,

  /// ENT username.
  #[serde(rename(deserialize = "e"))]
  pub ent_username: Option<String>,
 
  /// ENT password.
  #[serde(rename(deserialize = "f"))]
  pub ent_password: Option<String>,
  
  /// How the session is accessed.
  #[serde(rename(deserialize = "g"), default = "SessionAccessType::default")]
  pub access_type: SessionAccessType,

  /// Modulus for RSA encryption.
  /// Deprecated since PRONOTE v2023.
  #[serde(rename(deserialize = "MR"))]
  pub modulus_rsa: Option<String>,
  
  /// Exponent for RSA encryption.
  /// Deprecated since PRONOTE v2023.
  #[serde(rename(deserialize = "ER"))]
  pub exponent_rsa: Option<String>,

  /// Whether we should skip encryption or not.
  #[serde(rename(deserialize = "sCrA"), default)]
  pub skip_encryption: bool,
      
  /// Whether we should skip compression or not.
  #[serde(rename(deserialize = "sCoA"), default)]
  pub skip_compression: bool,

  /// Only defined and `true` when the instance doesn't have an SSL certificate
  /// that is linked directly in the PRONOTE.net server configuration.
  #[serde(default)]
  pub http: bool,
  
  /// Whether polling is involved or not.
  /// We don't provide anything around this feature in Pawnote for now.
  #[serde(default)]
  pub poll: bool
}
