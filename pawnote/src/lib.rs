use url::Url;

pub fn retrieve_pronote_root_url (pronote_url: String) -> String {
  let url = Url::parse(&pronote_url).unwrap();
  let origin = url.origin().ascii_serialization();
  let mut paths: Vec<&str> = url.path().split('/').collect();
  
  if let Some(last_path) = paths.last() {
    // Remove the last part of the path if ending with a ".json" or ".html".
    if last_path.ends_with(".json") || last_path.ends_with(".html") {
      let _ = paths.pop();
    }
  }

  // Remove empty paths (will also remove the first '/')
  paths.retain(|&x| !x.is_empty());

  // Join the paths back together ("pronote/eleve.html")
  let path_name = paths.join("/");

  if !path_name.is_empty() {
    // Put everything back, just add the '/' we removed
    // earlier before the actual path.
    origin + "/" + &path_name
  }
  else {
    // Path is the root, so no need to append it.
    origin
  }
}
