# Pawnote - A purrfect API wrapper for PRONOTE

A simple wrapper around [Index-Education's PRONOTE](https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php) internal API.

> This project is not affiliated with [Index-Education](https://www.index-education.com/) or PRONOTE in any way.

## Supported

### Versions

- 2022
- 2023
- 2024 (latest)

> This package wasn't tested for versions before 2022, so if anything is not working, please open an issue about it and mention that it's probably a breaking change between versions.
>
> Also, the PRONOTE version for primary schools is not supported yet, not sure if it will be in the future.

### Sessions

- Encrypted
- Compressed

### Accounts

- `élève` (student)

A support for other accounts (such as parents) will be added in the future.

### Authentication

- `username` and `password` (no ENT/CAS)
- `username` and `token`
- [QR Code](https://forum.index-education.com/upfiles/qrcode.png)

#### Note about ENT/CAS native support

It's **not and will never** be supported by Pawnote, for the reason that implementing each of them with every specificities requires a lot of time and effort. It's a pain to implement and track; as a matter of fact, most of the issues on [pronotepy](https://github.com/bain3/pronotepy/issues) - a similar project - are related to it. If you need to authenticate to an account protected by an ENT/CAS, you should go for the token or QR Code authentication.

#### Note about demonstration servers

Credentials (username and password without ENT/CAS) authentication works, but **token and QR Code authentication won't work**.

This is because demonstration servers doesn't save next-time tokens, even if it's able to generate them.

You can know if a server is a demonstration or not by reading the `isDemo` property on a `Pronote` instance in Pawnote.

## Installation

Use your favorite package manager to install [Pawnote from NPM](https://www.npmjs.com/package/pawnote).

```bash
# pnpm
pnpm add pawnote

# Yarn
yarn add pawnote

# npm
npm install pawnote
```

## Documentation & Guides

You can find the documentation, some guides and small examples at [literate.ink/pawnote](https://literate.ink/pawnote) for more information about the API and how to use it.

If you need complete examples, then we got **a lot** of those in the [`examples`](https://github.com/LiterateInk/Pawnote/tree/js/examples) folder, hoping you can find your joy in there.

If none of those are helpful, you can always [open an issue](https://github.com/LiterateInk/Pawnote/issues) to ask for help.

You can also join [LiterateInk's Discord server](https://literate.ink/discord) to talk about Pawnote, get help and be notified about the latest updates !
