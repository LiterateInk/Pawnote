---
editUrl: false
next: false
prev: false
title: "StudentDiscussionsOverview"
---

## Accessors

### discussions

> `get` **discussions**(): [`StudentDiscussion`](/api/classes/studentdiscussion/)[]

#### Returns

[`StudentDiscussion`](/api/classes/studentdiscussion/)[]

#### Source

[src/parser/discussion.ts:86](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L86)

***

### folders

> `get` **folders**(): [`StudentDiscussionFolder`](/api/classes/studentdiscussionfolder/)[]

#### Returns

[`StudentDiscussionFolder`](/api/classes/studentdiscussionfolder/)[]

#### Source

[src/parser/discussion.ts:82](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L82)

## Constructors

### new StudentDiscussionsOverview()

> **new StudentDiscussionsOverview**(`client`, `clientQueue`, `clientSession`, `data`): [`StudentDiscussionsOverview`](/api/classes/studentdiscussionsoverview/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **clientQueue**: `default`

• **clientSession**: `Session`

• **data**

• **data.listeEtiquettes**: `PronoteValue`\<`24`, `object`[]\>

• **data.listeMessagerie**: `PronoteValue`\<`24`, `object`[]\>

• **data.strSuperAdministrateurs**: `string`

#### Returns

[`StudentDiscussionsOverview`](/api/classes/studentdiscussionsoverview/)

#### Source

[src/parser/discussion.ts:25](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L25)

## Methods

### refetch()

> **refetch**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/discussion.ts:73](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L73)
