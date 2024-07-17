# Pawnote - Contributing to JavaScript implementation

## Prerequisites

- [Rust](https://www.rust-lang.org/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Getting Started

```bash
git clone https://github.com/LiterateInk/Pawnote
cd Pawnote/pawnote_js 
pnpm install  # Install dependencies
pnpm build    # Run the build script located at `./scripts/build.mjs`
# It will run "wasm-pack" under the hood...
# Once done, the bundle is available in the `dist` directory.
```

A lot of modifications are done in the [build script](./scripts/build.mjs) to make types and some specific behaviors work correctly (like making the `fetcher` parameter always optional).

If you want to add features to Pawnote, you should instead look at the [`pawnote` crate](../pawnote/) directly since most of the logic is shared between the JavaScript and the Rust implementations.

If you're more concerned about the `Fetcher` type, you should look at the [`npm` folder of our utilities](https://github.com/LiterateInk/Utilities/tree/main/npm) instead. That's where the `Fetcher` type is defined and shared across our different libraries.
