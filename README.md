# Pawnote - A purrfect API wrapper for Pronote

A simple wrapper around Index-Education's Pronote internal API.

## Supported

### Versions

> Note about versions before 2022 : This package wasn't tested concerning those, so not sure if it works but it should since not a lot of breaking changes were made.

- [x] 2022
- [x] Latest, 2023

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
- [ ] By [QR Code](https://forum.index-education.com/upfiles/qrcode.png)

**ENT support is not and will never be supported by Pawnote**, for the simple reason that implementing all of them with all of their specificities requires a lot of time and effort. It's simply a pain to implement and track, as a matter of fact, most of the issues on [pronotepy](https://github.com/bain3/pronotepy/issues) - a similar project - are related to ENTs.

#### Note about demonstration servers

Credentials authentication works, but **token authentication won't work**.
This is because demo servers doesn't save next-time tokens, even if it's able to generate them.

You can know if a server is a demo or not by getting the `isDemo` property on a `Pronote` instance.
It returns a boolean that is `true` when the server is a demo.

## Features

- [x] Timetable (per week and from/to dates)
  - [x] parser: `StudentLesson`
  - [x] parser: `StudentSubject`
  - [x] client: `.requestTimetableForWeek(weekNumber)`
  - [x] client: `.requestLessonsForInterval(from[, to])`
- [x] Homework (per week and from/to dates)
  - [x] client: `.getHomeworkForInterval(from[, to])`
  - [x] client: `.getHomeworkForWeek(weekNumber)`
  - [x] parser: `StudentHomework`
  - [x] parser: parse attachments using `StudentAttachment`
- [x] Update homework status
  - [x] client: `.patchHomeworkStatus(homeworkID, done)`
  - [x] parser: `StudentHomework.setDone(done)`
- [x] Attachment
  - [x] parser: `StudentAttachment`
  - [x] parser: able to get attachment's URL
- [x] Find Pronote instances with longitude and latitude
  - [x] `findPronoteInstances({ longitude, latitude })`
- Periods
  - [x] parser: `Period`
  - [x] client: `.periods` (property)
  - [x] parser: `Period.getGrades()`
- Grades
  - [x] client: `.getGradesForPeriod(period)`
  - [x] parser: `StudentGrade`

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

## Usage

You can see multiple examples in the [`examples`](./examples) folder.

## API

Documentation is not yet available, for now you'll have to use intellisense.
Most of the methods are self-explanatory and well commented.

We'll see if we can generate a documentation website
using comments from the source code in the future.

## Resources

Without these very useful resources, I wouldn't be able to write this whole client by myself.

- [Pronote Protocol](https://github.com/bain3/pronotepy/blob/master/PRONOTE%20protocol.md) written by developers of `pronotepy`.
- [`pronote-api`](https://github.com/dorian-eydoux/pronote-api/tree/master/src)'s (forked/archived) source code.
- [`pronotepy`](https://github.com/bain3/pronotepy)'s source code.
