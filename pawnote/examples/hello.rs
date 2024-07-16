extern crate pawnote;

fn main() {
  println!("{}", pawnote::retrieve_pronote_root_url(String::from("https://demo.index-education.net/pronote////eleve.html?fd=1")));
  println!("{}", pawnote::retrieve_pronote_root_url(String::from("https://demo.index-education.net/eleve.html?fd=1")));

  println!("{}", pawnote::WebSpace::Students.to_path());
}
