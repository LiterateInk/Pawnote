use crate::models::InstanceInformation;
use literateink_utilities::Response;

pub fn parse_response(response: Response) -> InstanceInformation {
  serde_json::from_str(&response.content).unwrap()
}
