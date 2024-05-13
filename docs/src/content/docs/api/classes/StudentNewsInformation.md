---
editUrl: false
next: false
prev: false
title: "StudentNewsInformation"
---

## Extends

- `StudentNewsItem`

## Accessors

### acknowledged

> `get` **acknowledged**(): `boolean`

Whether this news have been acknowledged or not.

#### Remark

This is not the same as reading the news, see `read` property.

#### Returns

`boolean`

#### Source

[src/parser/news.ts:435](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L435)

***

### acknowledgedDate

> `get` **acknowledgedDate**(): `undefined` \| `Date`

Date when the news have been acknowledged.
Only available if `acknowledged` is `true`.

#### Returns

`undefined` \| `Date`

#### Source

[src/parser/news.ts:443](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L443)

***

### attachments

> `get` **attachments**(): [`StudentAttachment`](/api/classes/studentattachment/)[]

#### Returns

[`StudentAttachment`](/api/classes/studentattachment/)[]

#### Source

[src/parser/news.ts:427](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L427)

***

### author

> `get` **author**(): `string`

Name of the author of the information / survey.

#### Example

```ts
"John D."
```

#### Returns

`string`

#### Source

[src/parser/news.ts:171](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L171)

***

### category

> `get` **category**(): [`StudentNewsCategory`](/api/classes/studentnewscategory/)

#### Returns

[`StudentNewsCategory`](/api/classes/studentnewscategory/)

#### Source

[src/parser/news.ts:151](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L151)

***

### content

> `get` **content**(): `string`

HTML string containing the news.

#### Returns

`string`

#### Source

[src/parser/news.ts:452](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L452)

***

### creationDate

> `get` **creationDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/news.ts:155](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L155)

***

### endDate

> `get` **endDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/news.ts:163](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L163)

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/news.ts:143](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L143)

***

### needToAcknowledge

> `get` **needToAcknowledge**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/news.ts:447](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L447)

***

### public

> `get` **public**(): `PronoteApiNewsPublicSelf`

Low level data about the public information of the user that'll send answers.
Used internally when sending answers to the server.

Most of the time, you won't need this.

#### Returns

`PronoteApiNewsPublicSelf`

#### Source

[src/parser/news.ts:181](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L181)

***

### question

> `get` **question**(): [`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)

Low level data about the "question" contained inside this information.

You can use this to serialize the question and
finally send it back to the server using `pronote.patchNewsState(data, [question], extra)`.

Internally, `acknowledged`, `content`, `attachments`, ... are based on this,
we're just renaming the properties and adding some sugar on top of it.

#### Remark

Most of the time, you won't need this, but it's here if you need it.

#### Returns

[`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)

#### Source

[src/parser/news.ts:467](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L467)

***

### read

> `get` **read**(): `boolean`

Whether this news have been read or not.

#### Returns

`boolean`

#### Source

[src/parser/news.ts:188](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L188)

***

### startDate

> `get` **startDate**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/news.ts:159](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L159)

***

### title

> `get` **title**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/parser/news.ts:147](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L147)

## Constructors

### new StudentNewsInformation()

> **new StudentNewsInformation**(`client`, `data`, `categories`): [`StudentNewsInformation`](/api/classes/studentnewsinformation/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **data**

• **data.L?**: `string`

Title of the news.

**Example**
```ts
"Coucou tout le monde !"
```

• **data.N**: `string`

• **data.auteur**: `string`

Full name of the author of this news.

**Example**
```ts
"John D."
```

• **data.categorie**: `PronoteValue`\<`24`, `object`\>

Category this news belongs to.

• **data.dateCreation**: `PronoteValue`\<`7`, `string`\>

Full date this news was created.

**Example**
```ts
"15/02/2024 23:09:10" // in the server timezone
```

• **data.dateDebut**: `PronoteValue`\<`7`, `string`\>

Date this news should be displayed.

**Example**
```ts
"15/02/2024"
```

• **data.dateFin**: `PronoteValue`\<`7`, `string`\>

Date this news should be stopped from being displayed.

**Example**
```ts
"06/07/2024"
```

• **data.elmauteur**: `PronoteValue`\<`24`, `object`\>

More information about the author ?
TODO: Find out for why this is needed ?

• **data.estAuteur**: `boolean`

Whether you are the author of this news.

• **data.estInformation**: `boolean`

Whether this news is actually a news or not.

• **data.estProlonge**: `boolean`

TODO: Not sure what this does.

• **data.estSondage**: `boolean`

Whether this news is actually a survey or not.

• **data.genrePublic**: `number`

• **data.listeQuestions**: `PronoteValue`\<`24`, `object`[]\>

• **data.lue**: `boolean`

Whether this news have been read or not.

• **data.prenom**: `string`

Student's first name.

• **data.public**: `PronoteValue`\<`24`, `object`\>

Student's more info.
This is needed to update the news' state.

• **data.reponseAnonyme**: `boolean`

Whether your response is anonymous or not.

• **categories**: [`StudentNewsCategory`](/api/classes/studentnewscategory/)[]

#### Returns

[`StudentNewsInformation`](/api/classes/studentnewsinformation/)

#### Overrides

`StudentNewsItem.constructor`

#### Source

[src/parser/news.ts:402](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L402)

## Methods

### acknowledge()

> **acknowledge**(`alsoMarkAsRead`): `Promise`\<`void`\>

Will acknowledge the news if needed,
so if the news doesn't need to be acknowledged (`!needToAcknowledge`)
or is already `acknowledged`, we will just do the read step.

When acknowledging, the news will be directly marked as read.
If you want to change this behavior, you can change the `alsoMarkAsRead` parameter.

#### Parameters

• **alsoMarkAsRead**: `boolean`= `true`

#### Returns

`Promise`\<`void`\>

#### Remark

You can't un-acknowledge a news.

#### Source

[src/parser/news.ts:418](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L418)

***

### delete()

> **delete**(): `Promise`\<`void`\>

Will delete the news from the user's news feed.

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StudentNewsItem.delete`

#### Remark

You can never get the news back after this.

#### Source

[src/parser/news.ts:119](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L119)

***

### markAsRead()

> **markAsRead**(`status`): `Promise`\<`void`\>

Patches the `read` state of the news to the given value.

#### Parameters

• **status**: `boolean`= `true`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StudentNewsItem.markAsRead`

#### Remark

Will do nothing if `this.read === status`.

#### Source

[src/parser/news.ts:102](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L102)

***

### patchQuestions()

> **patchQuestions**(`questions`, `alsoMarkAsRead`): `Promise`\<`void`\>

Low level method, used internally to patch questions (from `acknowledge()` and `answer()`).

Most of the time, you won't need this.

#### Parameters

• **questions**: [`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)[]

• **alsoMarkAsRead**: `boolean`= `true`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StudentNewsItem.patchQuestions`

#### Source

[src/parser/news.ts:132](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L132)
