use utilities::Response;
use crate::models::InstanceInformation;

pub fn parse_response (response: Response) -> InstanceInformation {
  serde_json::from_str(&response.content).unwrap()
}
