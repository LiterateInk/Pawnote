use literateink_utilities::Request;

pub fn build_request(pronote_url: String) -> Request {
  Request {
    url: pronote_url,
    method: "GET".into(),
    content: None,
    headers: vec![],
  }
}
