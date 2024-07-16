# `pawnote_wasm`

In this crate, we only provide WebAssembly bindings and build them using [`wasm-pack`](https://github.com/rustwasm/wasm-pack).

Actual build scripts for JavaScript and typings are in the [`pawnote_js`](../pawnote_js) directory.

## Development

```bash
wasm-pack build --target nodejs
# will output to a `pkg` directory.
```
