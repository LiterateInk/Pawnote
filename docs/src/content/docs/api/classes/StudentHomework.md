---
editUrl: false
next: false
prev: false
title: "StudentHomework"
---

## Constructors

### new StudentHomework()

> **new StudentHomework**(`client`, `homework`): [`StudentHomework`](/api/classes/studenthomework/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **homework**

• **homework.CouleurFond**: `string`

Subject color given by Pronote.

• **homework.DonneLe**: `PronoteValue`\<`7`, `string`\>

When the homework has been given.

**Example**
```ts
"22/01/2024"
```

• **homework.ListePieceJointe**: `PronoteValue`\<`24`, `PronoteApiAttachment`[]\>

Attachments.

• **homework.ListeThemes**: `PronoteApiThemesList`

Themes associated with the homework.

• **homework.Matiere**: `PronoteValue`\<`24`, `object`\>

Subject from where this homework is from.

• **homework.N**: `string`

ID of the homework.

• **homework.PourLe**: `PronoteValue`\<`7`, `string`\>

Due date for the homework.

**Example**
```ts
"24/01/2024"
```

• **homework.TAFFait**: `boolean`

`true` when the homework has been done.

• **homework.avecMiseEnForme**: `boolean`

• **homework.avecRendu?**: `boolean`

Whether the homework should be returned or not.

• **homework.cahierDeTextes?**: `PronoteValue`\<`24`, `object`\>

• **homework.cours**: `PronoteValue`\<`24`, `object`\>

• **homework.descriptif**: `PronoteValue`\<`21`, `string`\>

Content of the homework.
This is an HTML string, you can use whatever you want to parse/display it.

• **homework.documentRendu?**: `PronoteValue`\<`24`, `object`\>

• **homework.duree**: `number`

Time in minutes to do the exercice.

**Example**
```ts
30 // For 30 minutes.
```

• **homework.genreRendu?**: [`PronoteApiHomeworkReturnType`](/api/enumerations/pronoteapihomeworkreturntype/)

Type of return the teacher asks.

• **homework.libelleCBTheme**: `string`

**Example**
```ts
"Uniquement les thèmes associés aux matières du travail à faire"
```

• **homework.niveauDifficulte**: [`PronoteApiHomeworkDifficulty`](/api/enumerations/pronoteapihomeworkdifficulty/)

Difficulty of the given work.

• **homework.nomPublic**: `string`

• **homework.peuRendre?**: `boolean`

Whether you can upload or reupload a file.

#### Returns

[`StudentHomework`](/api/classes/studenthomework/)

#### Source

[src/parser/homework.ts:45](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L45)

## Methods

### getResource()

> **getResource**(): `Promise`\<`undefined` \| `StudentLessonResource`\>

#### Returns

`Promise`\<`undefined` \| `StudentLessonResource`\>

#### Source

[src/parser/homework.ts:101](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L101)

***

### removeUploadedFile()

> **removeUploadedFile**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/homework.ts:88](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L88)

***

### setDone()

> **setDone**(`done`): `Promise`\<`void`\>

#### Parameters

• **done**: `boolean`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/homework.ts:96](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L96)

***

### uploadFile()

> **uploadFile**(`file`, `fileName`): `Promise`\<`void`\>

#### Parameters

• **file**: `PawnoteSupportedFormDataFile`

• **fileName**: `string`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/homework.ts:80](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L80)

## Properties

### attachments

> **attachments**: [`StudentAttachment`](/api/classes/studentattachment/)[]

#### Source

[src/parser/homework.ts:19](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L19)

***

### backgroundColor

> **backgroundColor**: `string`

#### Source

[src/parser/homework.ts:16](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L16)

***

### deadline

> **deadline**: `Date`

#### Source

[src/parser/homework.ts:18](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L18)

***

### description

> **description**: `string`

#### Source

[src/parser/homework.ts:15](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L15)

***

### difficulty

> **difficulty**: [`PronoteApiHomeworkDifficulty`](/api/enumerations/pronoteapihomeworkdifficulty/)

#### Source

[src/parser/homework.ts:20](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L20)

***

### done

> **done**: `boolean`

#### Source

[src/parser/homework.ts:17](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L17)

***

### id

> **id**: `string`

#### Source

[src/parser/homework.ts:13](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L13)

***

### lengthInMinutes?

> `optional` **lengthInMinutes**: `number`

Time that should take, in minutes, to do the homework.

#### Source

[src/parser/homework.ts:22](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L22)

***

### lessonResourceID?

> `optional` **lessonResourceID**: `string`

If defined, can be used to retrieve
the lesson contents from the resources tab.

You can directly fetch the contents using `getContent()`.

#### Source

[src/parser/homework.ts:43](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L43)

***

### return?

> `optional` **return**: `object` \| `object`

Available only if the homework should be returned.

#### Source

[src/parser/homework.ts:29](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L29)

***

### subject

> **subject**: [`StudentSubject`](/api/classes/studentsubject/)

#### Source

[src/parser/homework.ts:14](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L14)

***

### themes

> **themes**: [`StudentTheme`](/api/classes/studenttheme/)[]

Themes associated with this homework.

#### Source

[src/parser/homework.ts:24](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/homework.ts#L24)
