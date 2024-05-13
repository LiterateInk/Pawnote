---
editUrl: false
next: false
prev: false
title: "StudentObservation"
---

## Constructors

### new StudentObservation()

> **new StudentObservation**(`item`): [`StudentObservation`](/api/classes/studentobservation/)

#### Parameters

• **item**: `PronoteApiAttendanceObservation`

#### Returns

[`StudentObservation`](/api/classes/studentobservation/)

#### Source

[src/parser/attendance.ts:136](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L136)

## Properties

### date

> **date**: `Date`

#### Source

[src/parser/attendance.ts:118](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L118)

***

### id

> **id**: `string`

#### Source

[src/parser/attendance.ts:116](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L116)

***

### opened

> **opened**: `boolean`

#### Source

[src/parser/attendance.ts:117](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L117)

***

### reason?

> `optional` **reason**: `string`

#### Source

[src/parser/attendance.ts:134](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L134)

***

### section

> **section**: `object`

#### id

> **id**: `string`

ID of the observation section.

Might be useful when you're looking for the same
observation section when going through an `StudentObservation` array.

#### name

> **name**: `string`

#### type

> **type**: [`PronoteApiAttendanceObservationType`](/api/enumerations/pronoteapiattendanceobservationtype/)

#### Source

[src/parser/attendance.ts:121](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L121)

***

### shouldParentsJustify

> **shouldParentsJustify**: `boolean`

#### Source

[src/parser/attendance.ts:119](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L119)

***

### subject?

> `optional` **subject**: [`StudentSubject`](/api/classes/studentsubject/)

#### Source

[src/parser/attendance.ts:133](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/attendance.ts#L133)
