const pawnote = require("../pkg/pawnote_wasm");

void async function main () {
  const text = pawnote.hello();
  console.log(text);
}()
