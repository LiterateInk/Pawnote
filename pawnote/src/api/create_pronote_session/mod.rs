//! `create_pronote_session` makes a request to the web space mobile endpoint
//! in order to create a new PRONOTE session.
//! 
//! When parsing, we simply extract the session information from the
//! returned HTML by reading relaxed JSON and converting it to a
//! `PronoteSession` type. 

mod request;
mod response;

pub use request::build_request;
pub use response::parse_response;
