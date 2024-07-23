use utilities::Request;

pub fn build_request (latitude: f32, longitude: f32) -> Request {
  // Build the query string, e.g.:
  // data={ "nomFonction": "geoLoc", "lat": "some_float", "long": "some_float" }
  let query = String::from(r#"data={"nomFonction":"geoLoc","lat":""#);
  let query = query + &latitude.to_string() + r#"","long":""#;
  let query = query + &longitude.to_string() + r#""}"#;

  Request {
    url: "https://www.index-education.com/swie/geoloc.php".to_string(),
    method: "POST".to_string(), 
    content: Some(query),
    headers: vec![
      ("Content-Type".to_string(), "application/x-www-form-urlencoded;charset=UTF-8".to_string())
    ],
  }
}