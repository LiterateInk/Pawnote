use wasm_bindgen::prelude::*;
use serde_repr::*;

#[derive(Serialize_repr, Deserialize_repr, PartialEq, Clone, Debug)]
#[wasm_bindgen]
#[repr(u8)]
pub enum WebSpace {
  Students = 6, // = Élèves
  
  /// This web space is currently not supported in Pawnote.
  Parents = 7,
  
  /// This web space is currently not supported in Pawnote.
  Teachers = 8, // = Professeurs

  /// This web space is currently not supported in Pawnote.
  Administration = 14, // = Vie Scolaire
  
  /// This web space is currently not supported in Pawnote.
  Management = 17, // = Direction
  
  /// This web space is currently not supported in Pawnote.
  Assistants = 26 // = Accompagnants
}

impl WebSpace {
  pub fn from_id (id: u8) -> Option<WebSpace> {
    match id {
      6 => Some(WebSpace::Students),
      7 => Some(WebSpace::Parents),
      8 => Some(WebSpace::Teachers),
      26 => Some(WebSpace::Assistants),
      14 => Some(WebSpace::Administration),
      17 => Some(WebSpace::Management),
      _ => None,
    }
  }
  
  pub fn to_path (&self) -> String {
    match self {
      WebSpace::Students => "mobile.eleve.html".into(),
      WebSpace::Parents => "mobile.parent.html".into(),
      WebSpace::Teachers => "mobile.professeur.html".into(),
      WebSpace::Assistants => "mobile.accompagnant.html".into(),
      WebSpace::Administration => "mobile.viescolaire.html".into(),
      WebSpace::Management => "mobile.direction.html".into(),
    }
  }
}