use serde::{Deserialize, Deserializer};

pub fn parse_float<'de, D>(deserializer: D) -> Result<f32, D::Error> where D: Deserializer<'de> {
  let s = String::deserialize(deserializer)?;
  s.parse::<f32>().map_err(serde::de::Error::custom)
} 

pub fn parse_u32<'de, D>(deserializer: D) -> Result<u32, D::Error> where D: Deserializer<'de> {
  let s = String::deserialize(deserializer)?;
  s.parse::<u32>().map_err(serde::de::Error::custom)
}

pub fn trim_string<'de, D>(deserializer: D) -> Result<String, D::Error> where D: Deserializer<'de> {
  let s = String::deserialize(deserializer)?;
  Ok(s.trim().to_string())
}
