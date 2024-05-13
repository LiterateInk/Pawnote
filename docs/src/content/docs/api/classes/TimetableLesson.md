---
editUrl: false
next: false
prev: false
title: "TimetableLesson"
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

### canceled

> `get` **canceled**(): `boolean`

Whether this lesson has been canceled or not.

#### Returns

`boolean`

#### Source

[src/parser/timetableLesson.ts:278](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L278)

***

### classrooms

> `get` **classrooms**(): `string`[]

List of classrooms.

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:318](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L318)

***

### endDate

> `get` **endDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/timetableLesson.ts:32](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L32)

***

### exempted

> `get` **exempted**(): `boolean`

Whether the user is exempted from this lesson or not.

#### Returns

`boolean`

#### Source

[src/parser/timetableLesson.ts:285](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L285)

***

### genre

> `get` **genre**(): [`PronoteApiLessonStatusType`](/api/enumerations/pronoteapilessonstatustype/)

#### Returns

[`PronoteApiLessonStatusType`](/api/enumerations/pronoteapilessonstatustype/)

#### Source

[src/parser/timetableLesson.ts:264](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L264)

***

### groupNames

> `get` **groupNames**(): `string`[]

List of group names.

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:325](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L325)

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/timetableLesson.ts:17](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L17)

***

### lessonResourceID

> `get` **lessonResourceID**(): `undefined` \| `string`

Returns `undefined` when there's no resource attached to this lesson.
Otherwise, it'll return an ID that can be used in `Pronote#getLessonResource` method.

A shortcut for this is to use the `getResource` method in this class.

#### Returns

`undefined` \| `string`

#### Source

[src/parser/timetableLesson.ts:342](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L342)

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

[src/parser/timetableLesson.ts:304](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L304)

***

### startDate

> `get` **startDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/timetableLesson.ts:27](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L27)

***

### status

> `get` **status**(): `undefined` \| `string`

#### Example

```ts
"Classe absente"
```

#### Returns

`undefined` \| `string`

#### Source

[src/parser/timetableLesson.ts:271](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L271)

***

### subject

> `get` **subject**(): `undefined` \| [`StudentSubject`](/api/classes/studentsubject/)

Subject of the lesson.

#### Returns

`undefined` \| [`StudentSubject`](/api/classes/studentsubject/)

#### Source

[src/parser/timetableLesson.ts:332](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L332)

***

### teacherNames

> `get` **teacherNames**(): `string`[]

List of teacher names.

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:311](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L311)

***

### test

> `get` **test**(): `boolean`

If there will be a test in the lesson.

#### Returns

`boolean`

#### Source

[src/parser/timetableLesson.ts:290](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L290)

***

### virtualClassrooms

> `get` **virtualClassrooms**(): `string`[]

List of URLs for virtual classrooms.

#### Returns

`string`[]

#### Source

[src/parser/timetableLesson.ts:297](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L297)

## Constructors

### new TimetableLesson()

> **new TimetableLesson**(`client`, `lesson`): [`TimetableLesson`](/api/classes/timetablelesson/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **lesson**: `object` \| `object` \| `object`

#### Returns

[`TimetableLesson`](/api/classes/timetablelesson/)

#### Overrides

`TimetableItem.constructor`

#### Source

[src/parser/timetableLesson.ts:208](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L208)

## Methods

### getResource()

> **getResource**(): `Promise`\<`undefined` \| `StudentLessonResource`\>

#### Returns

`Promise`\<`undefined` \| `StudentLessonResource`\>

#### Source

[src/parser/timetableLesson.ts:259](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetableLesson.ts#L259)

***

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
