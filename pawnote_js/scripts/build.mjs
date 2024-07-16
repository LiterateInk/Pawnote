// @ts-check
import { spawnSync } from "node:child_process";
import { copyFile, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { minify } from "terser";

/**
 * Clean a bit the WASM bundle.
 * 
 * @param {string} code
 * @returns {string} 
*/
const process_code = (code) => {
  const USELESS_TEXT_ENCODER_IMPORTS = `const { TextEncoder, TextDecoder } = require(\`util\`);`;
  const UTILITIES_IMPORT_NAME = "_literate_ink_utilities_";
  const WASM_FILE = "pawnote_wasm_bg.wasm";
  
  code = code.replace(USELESS_TEXT_ENCODER_IMPORTS, "");
  code = `const ${UTILITIES_IMPORT_NAME} = require('@literate.ink/utilities');\n` + code;
  code = code.replace(WASM_FILE, "node.wasm");

  code = code.replace(
    // Since fetcher parameter is always the last, we can match it that way. 
    /, fetcher\) {/g,
    // We add a default fetcher to prevent passing it every time.
    ", fetcher = _literate_ink_utilities_.defaultFetcher) {"
  );

  return code;
};


spawnSync('wasm-pack', ["build", "--target", "nodejs", "--release"], {
  cwd: "../pawnote_wasm"
});

await rm("./dist", { force: true, recursive: true });
await mkdir("./dist");

await copyFile("../pawnote_wasm/pkg/pawnote_wasm_bg.wasm", "./dist/node.wasm");
const not_minified = await readFile("../pawnote_wasm/pkg/pawnote_wasm.js", "utf8");
const processed = process_code(not_minified);
const minified = await minify(processed);
await writeFile("./dist/node.js", minified.code || "", "utf8");

