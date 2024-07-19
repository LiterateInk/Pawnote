use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
#[wasm_bindgen(getter_with_clone)]
pub struct InstanceInformationWebspace {
  #[serde(rename(deserialize = "nom"))]
  pub name: String,
  #[serde(rename(deserialize = "URL"))]
  pub path: String,
  #[serde(rename(deserialize = "avecDelegation"))]
  pub with_delegation: Option<bool>,
  #[serde(rename(deserialize = "protocole"))]
  pub protocol: Option<String>
}

#[derive(Serialize, Deserialize, Clone)]
#[wasm_bindgen(getter_with_clone)]
pub struct InstanceInformationCAS {
  #[serde(rename(deserialize = "actif"))]
  pub active: bool,
  #[serde(rename(deserialize = "casURL"))]
  pub url: String,
  #[serde(rename(deserialize = "jetonCAS"))]
  pub token: Option<String>
}

#[derive(Serialize, Deserialize, Clone)]
#[wasm_bindgen(getter_with_clone)]
pub struct InstanceInformation {
  /// Not sure what this is, apparently always `true`.
  #[serde(rename(deserialize = "modeModif"))]
  pub edit_mode: bool,

  /// Array of three or four numbers.
  /// First one is the year of the PRONOTE version.
  /// Other ones are probably a kind of version number, not sure what's their meaning.
  pub version: Vec<u16>,

  /// ISO formatted date of when the request was
  /// made in the server timezone.
  pub date: String,

  // List of available webspaces for that PRONOTE instance.
  #[serde(rename(deserialize = "espaces"))]
  pub webspaces: Vec<InstanceInformationWebspace>,
  
  /// Information about the Central Authentication Service (CAS).
  /// 
  /// When active, we can find here a token to build a CAS authentication on mobile.
  /// Can only be done using a WebView though.
  #[serde(rename(deserialize = "CAS"))]
  pub cas: InstanceInformationCAS,
  
  #[serde(rename(deserialize = "nomEtab"))]
  pub school_name: String
}