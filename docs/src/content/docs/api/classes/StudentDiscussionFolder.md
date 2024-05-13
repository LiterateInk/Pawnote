---
editUrl: false
next: false
prev: false
title: "StudentDiscussionFolder"
---

## Accessors

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/discussion.ts:102](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L102)

***

### name

> `get` **name**(): `string`

#### Returns

`string`

#### Source

[src/parser/discussion.ts:106](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L106)

***

### type

> `get` **type**(): [`PronoteApiDiscussionFolderType`](/api/enumerations/pronoteapidiscussionfoldertype/)

#### Returns

[`PronoteApiDiscussionFolderType`](/api/enumerations/pronoteapidiscussionfoldertype/)

#### Source

[src/parser/discussion.ts:110](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L110)

## Constructors

### new StudentDiscussionFolder()

> **new StudentDiscussionFolder**(`data`): [`StudentDiscussionFolder`](/api/classes/studentdiscussionfolder/)

#### Parameters

• **data**

• **data.G**: [`PronoteApiDiscussionFolderType`](/api/enumerations/pronoteapidiscussionfoldertype/)

• **data.L**: `string`

**Example**
```ts
"Brouillons"
```

• **data.N**: `string`

#### Returns

[`StudentDiscussionFolder`](/api/classes/studentdiscussionfolder/)

#### Source

[src/parser/discussion.ts:96](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L96)
