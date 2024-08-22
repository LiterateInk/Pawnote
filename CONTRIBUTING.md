# Contributing

## Development

To start developing, clone the repository and install the dependencies.

```bash
# Clone the repository.
git clone https://github.com/LiterateInk/Pawnote && cd Pawnote
# Switch to the JS/TS implementation branch.
git checkout js
# Install dependencies.
pnpm install
```

> In case you don't have `pnpm` installed, you can install it by running `npm install --global pnpm`.

## Publishing

Currently using `release-it` to create a tag and GitHub release.

```bash
# Create a new release.
pnpm release
```

An action will automatically publish the package to NPM when a tag is pushed to the repository.
