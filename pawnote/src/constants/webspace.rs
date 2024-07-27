use serde_repr::*;
use wasm_bindgen::prelude::*;

#[derive(Serialize_repr, Deserialize_repr, PartialEq, Clone, Debug)]
#[wasm_bindgen]
#[repr(u8)]
pub enum Webspace {
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
  Assistants = 26, // = Accompagnants
}

impl Webspace {
  pub fn from_id(id: u8) -> Option<Webspace> {
    match id {
      6 => Some(Webspace::Students),
      7 => Some(Webspace::Parents),
      8 => Some(Webspace::Teachers),
      26 => Some(Webspace::Assistants),
      14 => Some(Webspace::Administration),
      17 => Some(Webspace::Management),
      _ => None,
    }
  }

  pub fn to_path(&self) -> String {
    match self {
      Webspace::Students => "mobile.eleve.html".into(),
      Webspace::Parents => "mobile.parent.html".into(),
      Webspace::Teachers => "mobile.professeur.html".into(),
      Webspace::Assistants => "mobile.accompagnant.html".into(),
      Webspace::Administration => "mobile.viescolaire.html".into(),
      Webspace::Management => "mobile.direction.html".into(),
    }
  }
}
