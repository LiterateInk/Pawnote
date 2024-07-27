use crate::models::InstanceNearby;
use literateink_utilities::Response;

pub fn parse_response(response: Response) -> Vec<InstanceNearby> {
  serde_json::from_str(&response.content).unwrap_or(vec![])
}
