---
editUrl: false
next: false
prev: false
title: "DiscussionCreationRecipient"
---

## Extends

- [`MessageRecipient`](/api/classes/messagerecipient/)

## Accessors

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/recipient.ts:107](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L107)

***

### isPrincipal

> `get` **isPrincipal**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/recipient.ts:111](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L111)

***

### name

> `get` **name**(): `string`

#### Returns

`string`

#### Source

[src/parser/recipient.ts:14](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L14)

***

### subjects

> `get` **subjects**(): `DiscussionCreationRecipientResource`[]

#### Returns

`DiscussionCreationRecipientResource`[]

#### Source

[src/parser/recipient.ts:115](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L115)

***

### type

> `get` **type**(): `PronoteApiUserResourceType`

#### Returns

`PronoteApiUserResourceType`

#### Source

[src/parser/recipient.ts:18](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L18)

## Constructors

### new DiscussionCreationRecipient()

> **new DiscussionCreationRecipient**(`data`): [`DiscussionCreationRecipient`](/api/classes/discussioncreationrecipient/)

#### Parameters

• **data**

• **data.G**: `PronoteApiUserResourceType`

• **data.L**: `string`

• **data.N**: `string`

• **data.P**: `number`

• **data.avecDiscussion?**: `boolean`

Whether this user can discuss with the current user.

• **data.estPrincipal?**: `boolean`

Whether this user is the "Professeur Principal"

• **data.listeRessources**: `PronoteValue`\<`24`, `object` & `object`[]\>

#### Returns

[`DiscussionCreationRecipient`](/api/classes/discussioncreationrecipient/)

#### Overrides

[`MessageRecipient`](/api/classes/messagerecipient/).[`constructor`](/api/classes/messagerecipient/#constructors)

#### Source

[src/parser/recipient.ts:95](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L95)
