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

- [x] By `username` and `password` without any ENT
- [ ] By `username` and `password` with ENT
- [x] By `username` and `token`

I may need help to implement the authentication by ENT, since I don't have any account to test it.

Feel free to open an issue when you need the support for a specific ENT.
You can even open a pull request if you want to implement it yourself.

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
- [ ] Homework
  - [x] from/to dates
  - [ ] (per week)
  - [x] client: `.getHomeworkForInterval(from[, to])`
  - [x] parser: `StudentHomework`
  - [x] parser: parse attachments using `StudentAttachment`
- [x] Update homework status
  - [x] client: `.patchHomeworkStatus(homeworkID, done)`
  - [x] parser: `StudentHomework.setDone(done)`
- [x] Attachment
  - [x] parser: `StudentAttachment`
  - [x] parser: able to get attachment's URL

## Resources

Without these very useful resources, I wouldn't be able to write this whole client by myself.

- [Pronote Protocol](https://github.com/bain3/pronotepy/blob/master/PRONOTE%20protocol.md) written by developers of `pronotepy`.
- [`pronote-api`](https://github.com/dorian-eydoux/pronote-api/tree/master/src)'s (forked/archived) source code.
- [`pronotepy`](https://github.com/bain3/pronotepy)'s source code.
