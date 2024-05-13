---
editUrl: false
next: false
prev: false
title: "StudentNewsSurvey"
---

## Extends

- `StudentNewsItem`

## Accessors

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

### isAnonymous

> `get` **isAnonymous**(): `boolean`

Whether your response is anonymous or not.

#### Returns

`boolean`

#### Source

[src/parser/news.ts:216](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L216)

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

### questions

> `get` **questions**(): [`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)[]

List of the questions contained in this survey.
You can answer them by reassigning the `answer` property.

#### Example

```ts
question.answer = "[1..2]";
```

#### Returns

[`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)[]

#### Source

[src/parser/news.ts:211](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L211)

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

### new StudentNewsSurvey()

> **new StudentNewsSurvey**(`client`, `data`, `categories`): [`StudentNewsSurvey`](/api/classes/studentnewssurvey/)

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

[`StudentNewsSurvey`](/api/classes/studentnewssurvey/)

#### Overrides

`StudentNewsItem.constructor`

#### Source

[src/parser/news.ts:197](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L197)

## Methods

### answer()

> **answer**(`answers`, `alsoMarkAsRead`): `Promise`\<`void`\>

Answers the survey with the given answers.
By default, it'll answer with the questions that were given when the survey was created.

You can either manipulate the questions directly or pass in your own answers.

#### Parameters

• **answers**: [`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)[]= `undefined`

• **alsoMarkAsRead**: `boolean`= `true`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/news.ts:226](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/news.ts#L226)

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
