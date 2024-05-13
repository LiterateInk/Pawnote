---
editUrl: false
next: false
prev: false
title: "DraftMessage"
---

## Accessors

### content

> `get` **content**(): `string`

> `set` **content**(`value`): `void`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Source

[src/parser/messages.ts:247](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L247)

***

### isHTML

> `get` **isHTML**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/messages.ts:255](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L255)

***

### possessionID

> `get` **possessionID**(): `string`

#### Returns

`string`

#### Source

[src/parser/messages.ts:239](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L239)

***

### replyMessageID

> `get` **replyMessageID**(): `string`

#### Returns

`string`

#### Source

[src/parser/messages.ts:243](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L243)

## Constructors

### new DraftMessage()

> **new DraftMessage**(`overview`, `message`): [`DraftMessage`](/api/classes/draftmessage/)

#### Parameters

• **overview**: [`MessagesOverview`](/api/classes/messagesoverview/)

• **message**: `PronoteApiDraftMessage`

#### Returns

[`DraftMessage`](/api/classes/draftmessage/)

#### Source

[src/parser/messages.ts:219](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L219)

## Methods

### delete()

> **delete**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:227](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L227)

***

### save()

> **save**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:231](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L231)

***

### send()

> **send**(`includeParentsAndStudents`): `Promise`\<`void`\>

#### Parameters

• **includeParentsAndStudents**: `boolean`= `false`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:235](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L235)
