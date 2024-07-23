//! This call will give you PRONOTE instances
//! within a 20km radius according to the latitude
//! and longitude given.

mod request;
mod response;

pub use request::build_request;
pub use response::parse_response;
