---
editUrl: false
next: false
prev: false
title: "FetchedMessageRecipient"
---

## Extends

- [`MessageRecipient`](/api/classes/messagerecipient/)

## Accessors

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/recipient.ts:33](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L33)

***

### name

> `get` **name**(): `string`

#### Returns

`string`

#### Source

[src/parser/recipient.ts:14](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L14)

***

### refuseMessages

> `get` **refuseMessages**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/recipient.ts:37](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L37)

***

### type

> `get` **type**(): `PronoteApiUserResourceType`

#### Returns

`PronoteApiUserResourceType`

#### Source

[src/parser/recipient.ts:18](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L18)

## Constructors

### new FetchedMessageRecipient()

> **new FetchedMessageRecipient**(`data`): [`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)

#### Parameters

• **data**: `PronoteApiUserMessageRecipient`

#### Returns

[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)

#### Overrides

[`MessageRecipient`](/api/classes/messagerecipient/).[`constructor`](/api/classes/messagerecipient/#constructors)

#### Source

[src/parser/recipient.ts:27](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L27)
