// @ts-check
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { minify } from "terser";

const WASM_PKG_FILE_NAME = "pawnote_bg.wasm";
const UTILITIES_PACKAGE_NAME = "@literate.ink/utilities";

console.info("[INFO]: Building the WASM file in 'pawnote' crate...");
spawnSync('wasm-pack', ["build", "--target", "web", "--release"], {
  cwd: "../pawnote",
  stdio: "inherit"
});

console.info("[INFO]: Setting up 'dist' in 'pawnote_js'...");
await rm("./dist", { force: true, recursive: true });
await mkdir("./dist");

/**
 * @param {string} name
 * @returns {string}
 */
const pathFromPKG = (name) => `../pawnote/pkg/${name}`;

/**
 * 
 * @param {string} name 
 * @param {string} content 
 * @returns {Promise<void>}
 */
const writeToDIST = (name, content) => writeFile(`./dist/${name}`, content, "utf8");

const WASM = await readFile(pathFromPKG(WASM_PKG_FILE_NAME));

{ // Process the JS file.
  let content = await readFile(pathFromPKG("pawnote.js"), "utf8");
  
  // Clean imports.
  // const USELESS_TEXT_ENCODER_IMPORTS = `const { TextEncoder, TextDecoder } = require(\`util\`);`;
  // content = content.replace(USELESS_TEXT_ENCODER_IMPORTS, "");
  // console.info("[JS]: Removed useless imports.");
  
  // Add an import to utilities.
  content = `import { defaultFetcher as utils__defaultFetcher } from '${UTILITIES_PACKAGE_NAME}';\n` + content;
  console.info("[JS]: Added utilities import.");
  
  // Replace the WASM file name.
  // content = content.replace(WASM_PKG_FILE_NAME, WASM_DIST_FILE_NAME);
  // console.info("[JS]: Rewrote WASM file name.");

  // Add default fetcher to the fetcher parameter (to make it optional)
  content = content.replace(
    // Since fetcher parameter is always the last, we can match it that way. 
    /, fetcher\) {/g,
    `, fetcher = utils__defaultFetcher) {`
  );
  console.info("[JS]: Added default fetcher to 'fetcher' parameters.");

  // Remove useless exports.
  content = content.replace("export { initSync }", "");
  content = content.replace("export default __wbg_init;", "");

  // Add the WASM file to the bundle.
  content += `await __wbg_init(${JSON.stringify("data:application/wasm;base64," + WASM.toString("base64"))})`;
  console.info("[JS]: Copied WASM file into the file itself.");

  content = (await minify(content)).code || "";
  console.info("[JS]: Minified !");

  await writeToDIST("index.js", content);
  console.info("[JS]: Wrote file.");
}

{ // Process the D.TS file.
  let content = await readFile(pathFromPKG("pawnote.d.ts"), "utf8");

  // Add an import to utilities.
  content = `import type { Fetcher } from '${UTILITIES_PACKAGE_NAME}';\n` + content;
  console.info("[D.TS]: Added utilities import.");

  // Make every fetcher optional by adding a default fetcher (and the type)
  content = content.replace(
    /, fetcher: Function\)/g,
    `, fetcher?: Fetcher)`
  );
  console.info("[D.TS]: Typed 'fetcher' and made it optional.");

  // Do the same in the JSDoc comments.
  content = content.replace(
    /@param {Function} fetcher/g,
    `@param {Fetcher} [fetcher]`
  );
  console.info("[D.TS]: Typed 'fetcher' and made it optional in JSDoc.");

  await writeToDIST("index.d.ts", content);
  console.info("[D.TS]: Wrote file !");
}

console.info("[INFO]: Cleaning up 'pkg' folder in 'pawnote' crate.");
await rm("../pawnote/pkg", { force: true, recursive: true }).catch(() => void 0);

console.info("[INFO]: Done !");
console.info("[INFO]: You can find the bundle in ./dist/");
