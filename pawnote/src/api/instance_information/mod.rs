//! Makes a request to the infoMobileApp.json endpoint in order to get
//! some information about an instance without having to log in.
//! 
//! For example, we can use it to know if the instance has a "CAS"
//! set up or not. We can also grab the currently available webspaces
//! and the instance PRONOTE version.

mod request;
mod response;

pub use request::build_request;
pub use response::parse_response;
