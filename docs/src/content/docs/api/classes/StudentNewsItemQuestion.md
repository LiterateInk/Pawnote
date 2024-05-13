---
editUrl: false
next: false
prev: false
title: "StudentNewsItemQuestion"
---

## Accessors

### answerDate

> `get` **answerDate**(): `undefined` \| `Date`

#### Returns

`undefined` \| `Date`

#### Source

[src/parser/news.ts:386](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L386)

***

### answerID

> `get` **answerID**(): `string`

#### Returns

`string`

#### Source

[src/parser/news.ts:374](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L374)

***

### answered

> `get` **answered**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/news.ts:378](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L378)

***

### attachments

> `get` **attachments**(): [`StudentAttachment`](/api/classes/studentattachment/)[]

#### Returns

[`StudentAttachment`](/api/classes/studentattachment/)[]

#### Source

[src/parser/news.ts:343](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L343)

***

### choices

> `get` **choices**(): `object`[]

#### Returns

`object`[]

#### Source

[src/parser/news.ts:390](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L390)

***

### content

> `get` **content**(): `string`

#### Returns

`string`

#### Source

[src/parser/news.ts:339](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L339)

***

### fullTitle

> `get` **fullTitle**(): `string`

#### Returns

`string`

#### Source

[src/parser/news.ts:311](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L311)

***

### genre

> `get` **genre**(): `number`

#### Returns

`number`

#### Source

[src/parser/news.ts:347](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L347)

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/news.ts:307](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L307)

***

### maximumChoices

> `get` **maximumChoices**(): `number`

#### Returns

`number`

#### Source

[src/parser/news.ts:335](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L335)

***

### maximumLength

> `get` **maximumLength**(): `number`

#### Returns

`number`

#### Source

[src/parser/news.ts:327](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L327)

***

### position

> `get` **position**(): `number`

#### Returns

`number`

#### Source

[src/parser/news.ts:319](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L319)

***

### selectedAnswers

> `get` **selectedAnswers**(): `undefined` \| `number`[]

#### Returns

`undefined` \| `number`[]

#### Source

[src/parser/news.ts:351](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L351)

***

### shouldAnswer

> `get` **shouldAnswer**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/news.ts:382](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L382)

***

### shouldRespectMaximumChoices

> `get` **shouldRespectMaximumChoices**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/news.ts:331](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L331)

***

### textInputAnswer

> `get` **textInputAnswer**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/parser/news.ts:355](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L355)

***

### title

> `get` **title**(): `string`

#### Returns

`string`

#### Source

[src/parser/news.ts:315](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L315)

***

### type

> `get` **type**(): [`PronoteApiNewsQuestionType`](/api/enumerations/pronoteapinewsquestiontype/)

#### Returns

[`PronoteApiNewsQuestionType`](/api/enumerations/pronoteapinewsquestiontype/)

#### Source

[src/parser/news.ts:323](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L323)

## Constructors

### new StudentNewsItemQuestion()

> **new StudentNewsItemQuestion**(`client`, `data`): [`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **data**

• **data.L**: `string`

Full title with index in front.

**Example**
```ts
"Q 1 : Multiples"
```

• **data.N**: `string`

• **data.P**: `number`

• **data.avecMaximum**: `boolean`

• **data.genreReponse**: [`PronoteApiNewsQuestionType`](/api/enumerations/pronoteapinewsquestiontype/)

• **data.listeChoix**: `PronoteValue`\<`24`, `object`[]\>

• **data.listePiecesJointes**: `PronoteValue`\<`24`, `PronoteApiAttachment`[]\>

• **data.nombreReponsesMax**: `number`

• **data.rang**: `number`

Position of the question in the list.
Should be displayed in this order.

• **data.reponse**: `PronoteValue`\<`24`, `object`\>

• **data.tailleReponse**: `number`

• **data.texte**: `PronoteValue`\<`21`, `string`\>

Raw HTML containing the question's
content. This is not sanitized.

• **data.titre**: `string`

Question's title.

**Example**
```ts
"Multiples"
```

#### Returns

[`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)

#### Source

[src/parser/news.ts:263](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L263)

## Methods

### patch()

#### patch(textInputAnswer)

> **patch**(`textInputAnswer`?): `void`

##### Parameters

• **textInputAnswer?**: `string`

##### Returns

`void`

##### Source

[src/parser/news.ts:359](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L359)

#### patch(selectedAnswers, otherFieldTextValue)

> **patch**(`selectedAnswers`?, `otherFieldTextValue`?): `void`

##### Parameters

• **selectedAnswers?**: `number`[]

• **otherFieldTextValue?**: `string`

##### Returns

`void`

##### Source

[src/parser/news.ts:360](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L360)
