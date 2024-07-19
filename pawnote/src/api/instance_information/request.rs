use utilities::Request;

const MOBILE_INFO_ENDPOINT: &str = "/infoMobileApp.json?id=0D264427-EEFC-4810-A9E9-346942A862A4";

pub fn build_request (pronote_root_url: String) -> Request {
  let mut pronote_url = pronote_root_url.clone();
  pronote_url.push_str(MOBILE_INFO_ENDPOINT);

  Request {
    url: pronote_url,
    method: "GET".into(),
    content: None,
    headers: vec![]
  }
}