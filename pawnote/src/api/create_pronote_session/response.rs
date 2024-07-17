use utilities::Response;
use regex::Regex;

use crate::models::PronoteSession;

pub fn parse_response (response: Response) -> PronoteSession {
  let relaxed_data = {
    let start = "Start (";
    let start_pos = response.content.find(start).ok_or("Failed to find start marker").unwrap() + start.len();
    
    let end = ") } catch";
    let end_pos = response.content.find(end).ok_or("Failed to find end marker").unwrap();
    
    &response.content[start_pos..end_pos]
  };

  // Convert the relaxed JSON to something we can parse with serde.
  let session_data_string = {
    let relaxed_keys_regex = Regex::new(r#"(['"])?([a-z0-9A-Z_]+)(['"])?:\s*"#).unwrap();
    let session_data_string = relaxed_keys_regex.replace_all(relaxed_data, "\"$2\": ");
    session_data_string.replace('\'', "\"")
  };

  serde_json::from_str(&session_data_string).unwrap()
}
