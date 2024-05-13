---
editUrl: false
next: false
prev: false
title: "TimetableActivity"
---

## Extends

- `TimetableItem`

## Accessors

### attendants

> `get` **attendants**(): `string`[]

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:177](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L177)

***

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

### resourceTypeName

> `get` **resourceTypeName**(): `string`

#### Returns

`string`

#### Source

[src/parser/timetableLesson.ts:181](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L181)

***

### resourceValue

> `get` **resourceValue**(): `string`

#### Returns

`string`

#### Source

[src/parser/timetableLesson.ts:185](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L185)

***

### startDate

> `get` **startDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/timetableLesson.ts:27](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L27)

***

### title

> `get` **title**(): `string`

#### Returns

`string`

#### Source

[src/parser/timetableLesson.ts:173](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L173)

## Constructors

### new TimetableActivity()

> **new TimetableActivity**(`client`, `activity`): [`TimetableActivity`](/api/classes/timetableactivity/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **activity**: `object` \| `object` \| `object`

#### Returns

[`TimetableActivity`](/api/classes/timetableactivity/)

#### Overrides

`TimetableItem.constructor`

#### Source

[src/parser/timetableLesson.ts:160](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L160)

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
