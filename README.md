![Pawnote Banner](.github/assets/banner.svg)

[PRONOTE](https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php) is a school management application used by educational establishments to centralize and facilitate communication between teachers, students and parents. It lets you manage and consult timetables, grades, absences and homework, as well as communicate via messages. PRONOTE aims to improve the transparency and efficiency of day-to-day school management.

Pawnote is a wrapper around [PRONOTE](https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php)'s internal API.

> This project is not affiliated with [Index-Education](https://www.index-education.com/) or PRONOTE in any way.

## Implementations

This library is meant to be used in various languages and platforms, it's very important
for Literate since it runs on multiple platforms with multiple languages.

- [`pawnote`](/pawnote) : "core" implementation written in Rust ;
- [`pawnote_js`](/pawnote_js) : NPM package made from WebAssembly bindings ;
- [`pawnote_ffi`](/pawnote_ffi) : Foreign Function Interface bindings for C, C++, Python, etc. - currently a work in progress.

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

- `username` and `password` (no CAS)
- `username` and `token`
- [QR Code](https://forum.index-education.com/upfiles/qrcode.png)

#### Note about CAS (Central Authentication Service)

It's **not and will never** be supported by Pawnote, for the reason that implementing each of them with every specificities requires a lot of time and effort. It's a pain to implement and track; as a matter of fact, most of the issues on [pronotepy](https://github.com/bain3/pronotepy/issues) - a similar project - are related to it. If you need to authenticate to an account protected by an CAS, you should go for the token or QR Code authentication.

#### Note about demonstration servers

Credentials (username and password without CAS) authentication works, but **token and QR Code authentication won't work**.

This is because demonstration servers doesn't save next-time tokens, even if it's able to generate them.

## Documentation & Guides

You can find the documentation, some guides at <https://docs.literate.ink/pawnote>.

If you need examples, then you can have some in the [`/examples`](https://github.com/LiterateInk/Pawnote/tree/main/examples) directory, hoping you can find your joy in there.

If none of those are helpful, you can always [open an issue](https://github.com/LiterateInk/Pawnote/issues) to ask for help.

You can also join [LiterateInk's Discord server](https://literate.ink/discord) to talk about Pawnote, get help and be notified about the latest updates !

## Credits

Without those people / projects / documentations, Pawnote wouldn't be here.

- [PRONOTE Protocol](https://github.com/bain3/pronotepy/blob/master/PRONOTE%20protocol.md) written by developers of `pronotepy`.
- [`pronote-api`](https://github.com/Merlode11/pronote-api)'s (forked) source code.
- [`pronotepy`](https://github.com/bain3/pronotepy)'s source code.
- [PRONOTE QR Code API](https://github.com/Androz2091/pronote-qrcode-api)
- [Read encrypted/compressed responses from PRONOTE](https://gist.github.com/Vexcited/3b599b4eaf0797b532f087540728ec09)
- [Install a SSL certificate on a PRONOTE instance for development purposes](https://gist.github.com/Vexcited/977d7a71aab3f5082f476bdb9e7c1248)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
