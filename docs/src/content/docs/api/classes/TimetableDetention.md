---
editUrl: false
next: false
prev: false
title: "TimetableDetention"
---

## Extends

- `TimetableItem`

## Accessors

### backgroundColor

> `get` **backgroundColor**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/parser/timetableLesson.ts:22](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L22)

***

### blockLength

> `get` **blockLength**(): `number`

#### Returns

`number`

#### Source

[src/parser/timetableLesson.ts:37](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L37)

***

### blockPosition

> `get` **blockPosition**(): `number`

#### Returns

`number`

#### Source

[src/parser/timetableLesson.ts:42](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L42)

***

### classrooms

> `get` **classrooms**(): `string`[]

List of classrooms.

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:150](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L150)

***

### endDate

> `get` **endDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/timetableLesson.ts:32](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L32)

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/timetableLesson.ts:17](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L17)

***

### notes

> `get` **notes**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/parser/timetableLesson.ts:47](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L47)

***

### personalNames

> `get` **personalNames**(): `string`[]

List of personal names.

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:136](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L136)

***

### startDate

> `get` **startDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/timetableLesson.ts:27](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L27)

***

### teacherNames

> `get` **teacherNames**(): `string`[]

List of teacher names.

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:143](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L143)

***

### title

> `get` **title**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/parser/timetableLesson.ts:129](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L129)

## Constructors

### new TimetableDetention()

> **new TimetableDetention**(`client`, `detention`): [`TimetableDetention`](/api/classes/timetabledetention/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **detention**: `object` \| `object` \| `object`

#### Returns

[`TimetableDetention`](/api/classes/timetabledetention/)

#### Overrides

`TimetableItem.constructor`

#### Source

[src/parser/timetableLesson.ts:100](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L100)

## Methods

### isActivity()

> **isActivity**(): `this is TimetableActivity`

#### Returns

`this is TimetableActivity`

#### Inherited from

`TimetableItem.isActivity`

#### Source

[src/parser/timetableLesson.ts:81](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L81)

***

### isDetention()

> **isDetention**(): `this is TimetableDetention`

#### Returns

`this is TimetableDetention`

#### Inherited from

`TimetableItem.isDetention`

#### Source

[src/parser/timetableLesson.ts:85](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L85)

***

### isLesson()

> **isLesson**(): `this is TimetableLesson`

#### Returns

`this is TimetableLesson`

#### Inherited from

`TimetableItem.isLesson`

#### Source

[src/parser/timetableLesson.ts:89](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L89)
