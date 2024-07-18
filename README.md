<p align="center">
  <picture>
    <img alt="Pawnote Banner" src="https://github.com/LiterateInk/Pawnote/blob/d30e0dea20990a7488d4f6c961c6816dd5c89ebb/.github/assets/%5BPawnote%5D%20README.svg">
  </picture>
</p>

[PRONOTE](https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php) is a school management application used by educational establishments to centralize and facilitate communication between teachers, students and parents. It lets you manage and consult timetables, grades, absences and homework, as well as communicate via messages. PRONOTE aims to improve the transparency and efficiency of day-to-day school management.

Pawnote is a wrapper around [Index-Education's PRONOTE](https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php) internal API.

> [!NOTE]
> This project is not affiliated with [Index-Education](https://www.index-education.com/) or PRONOTE in any way.

## Implementations

This library is meant to be used in various languages and platforms, it's very important
for Literate since it runs on multiple platforms with multiple languages.

- [`pawnote`](/pawnote) : "core" implementation written in Rust ;
- [`pawnote_js`](/pawnote_js) : NPM package made from WebAssembly bindings ;
- [`pawnote_ffi`](/pawnote_ffi) : Foreign Function Interface bindings for C, C++, Python, etc. - currently a work in progress.

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
