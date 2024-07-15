# pawnote.js

> Uses WebAssembly to run on every platform.

## Usage

### Browser

If for some reason you want to run this library in a browser, you won't be able to do this for now.
We only supports Node.js targets, but in the future it might be possible.

### React Native

You might need to install [`react-native-webassembly`](https://github.com/cawfree/react-native-webassembly) to use this package. The library wasn't tested in such environment though so some adjustments might be needed.

## Development

You can build the library by using `wasm-pack`.

```bash
wasm-pack build --target nodejs
# will output to a `pkg` directory.
```

Once there, you can now run any example in the `examples` folder.
We use [Bun](https://bun.sh/) here to run the examples but you can use [Node.js](https://nodejs.org/) with [`tsx`](https://www.npmjs.com/package/tsx) (`npm install --global tsx`).

```bash
# require (CJS)
bun run ./examples/hello.ts
# or tsx ./examples/hello.ts

# import (ESM)
bun run ./examples/hello.mts
# or tsx ./examples/hello.mts
```
