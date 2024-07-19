//! Models are where we're doing all the parsing.
//! 
//! This might be where we implement helper functions in the structs
//! or we just rename the fields to have better and meaningful naming.

mod session;
pub use session::*;

mod session_information;
pub use session_information::*;

mod instance_information;
pub use instance_information::*;
