const pawnote = require("../pkg/pawnote_wasm");

void async function main () {
  console.log(pawnote.retrieve_pronote_root_url("https://demo.index-education.net/pronote////eleve.html?fd=1"));
  console.log(pawnote.retrieve_pronote_root_url("https://demo.index-education.net////eleve.html?fd=1"));
  console.log(pawnote.retrieve_pronote_root_url("https://demo.index-education.net////eleve/hehe/l.html?fd=1"));
}();
