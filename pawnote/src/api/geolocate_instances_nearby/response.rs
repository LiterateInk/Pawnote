use utilities::Response;
use crate::models::InstanceNearby;

pub fn parse_response (response: Response) -> Vec<InstanceNearby> {
  serde_json::from_str(&response.content).unwrap_or(vec![])
}
