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
  - [x] parser: `Lesson`
  - [x] parser: `LessonSubject`
  - [x] client: `.requestTimetableForWeek(weekNumber)`
  - [x] client: `.requestLessonsForInterval(from[, to])`

## `Date`s in Pawnote

Every single `Date` used in Pawnote is **localized** to the timezone of the client running the code.

Why ? Well, because Pronote's API returns dates in the timezone of the server, so it is easier to work with localized dates.

So don't be surprised if you see a date that is different from the one you expected, it was probably converted to UTC.

See the example below where the client running the code is in UTC+2 (Europe/Paris).

```javascript
const lessons = await pronote.requestLessonsForInterval(from, to);
lessons.forEach(lesson => {
  // Using `lesson.start` raw will return the date value in UTC.
  // Using lesson.start.toLocaleString() will return the date in the timezone of the client.
  console.log(lesson.start, "|", lesson.start.toLocaleString());
})
```

```console
2023-09-19T09:00:00.000Z | 9/19/2023, 11:00:00 AM
2023-09-19T08:00:00.000Z | 9/19/2023, 10:00:00 AM
2023-09-19T13:30:00.000Z | 9/19/2023, 3:30:00 PM
```

## Resources

Without these very useful resources, I wouldn't be able to write this whole client by myself.

- [Pronote Protocol](https://github.com/bain3/pronotepy/blob/master/PRONOTE%20protocol.md) written by developers of `pronotepy`.
- [`pronote-api`](https://github.com/dorian-eydoux/pronote-api/tree/master/src)'s (forked/archived) source code.
- [`pronotepy`](https://github.com/bain3/pronotepy)'s source code.
