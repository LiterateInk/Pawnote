# Pawnote - A purrfect API wrapper for Pronote

A simple wrapper around [Index-Education's Pronote](https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php) internal API.

> [!NOTE]  
> This project is not affiliated with Index-Education or Pronote in any way.

> Join [LiterateInk's Discord server](https://literate.ink/discord) to talk about Pawnote, get help and be notified about the latest updates !

## Supported

### Versions

- [x] 2022
- [x] 2023 (latest)

> [!WARNING]  
> This package wasn't tested for versions before 2022, so if anything is not working, please open an issue about it and mention that it's probably a breaking change between versions.
> Also, the PRONOTE version for primary schools is not supported yet, not sure if it will be in the future.

### Sessions

- [x] Encrypted
- [x] Compressed

### Accounts

- [x] `élève` (student)
- [ ] `parent`

A support for other accounts will be added in the future.

### Authentication

- [x] By `username` and `password` (no ENT)
- [x] By `username` and `token`
- [x] By [QR Code](https://forum.index-education.com/upfiles/qrcode.png)

> [!IMPORTANT]  
> **ENT native support is not and will never be supported by Pawnote**, for the reason that implementing each of them with every specificities requires a lot of time and effort. It's a pain to implement and track; as a matter of fact, most of the issues on [pronotepy](https://github.com/bain3/pronotepy/issues) - a similar project - are related to ENTs.

#### Note about demonstration servers

Credentials authentication works, but **token authentication won't work**.
This is because demo servers doesn't save next-time tokens, even if it's able to generate them.

You can know if a server is a demo or not by getting the `isDemo` property on a `Pronote` instance.
It returns a boolean that is `true` when the server is a demo.

## Features

- Timetable (per week and from/to dates)
- Homework (per week and from/to dates)
  - Able to update status of an homework (done / not done)
- Attachments
  - Able to generate URLs from API
- Resources (per week and from/to dates)
- Find Pronote instances using `longitude` and `latitude`
- Get informations about an instance from its URL
- Periods
- Grades & Averages
  - Read periods using `Pronote.readDefaultPeriodForGradesOverview()` and `Pronote.readPeriodsForGradesOverview()`
- Evaluations and Skills (= Acquisition)
  - Read periods using `Pronote.readDefaultPeriodForEvaluations()` and `Pronote.readPeriodsForEvaluations()`
- Personal informations
- Custom `fetcher` to call the API with another API than [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API)
- Send `Presence` requests to keep alive the connection
  - Manually setup : `Pronote.startPresenceRequests()` and `Pronote.stopPresenceRequests()`
- News
  - Read content of informations and/or surveys
  - Update, edit and publish answers to surveys
  - Mark informations and/or surveys as read/unread
  - Acknowledge informations
- Discussions
  - Read available discussions and categories
  - Read messages from a discussion
  - Fetch recipients of a message/discussion
- Attendance : Absences, Punishments and Delays
  - Read periods using `Pronote.readDefaultPeriodForAttendance()` and `Pronote.readPeriodsForAttendance()`
- Error handlers
  - `PawnoteNetworkFail`

...and a lot more !

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

## Resources

Without these very useful resources, I wouldn't be able to write this whole client by myself.

- [Pronote Protocol](https://github.com/bain3/pronotepy/blob/master/PRONOTE%20protocol.md) written by developers of `pronotepy`.
- [`pronote-api`](https://github.com/Merlode11/pronote-api)'s (forked) source code.
- [`pronotepy`](https://github.com/bain3/pronotepy)'s source code.
- [Pronote QR Code API](https://github.com/Androz2091/pronote-qrcode-api)
- [Read encrypted/compressed responses from Pronote](https://gist.github.com/Vexcited/3b599b4eaf0797b532f087540728ec09)
