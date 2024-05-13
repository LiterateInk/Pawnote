---
editUrl: false
next: false
prev: false
title: "MessageRecipient"
---

## Extended by

- [`DiscussionCreationRecipient`](/api/classes/discussioncreationrecipient/)
- [`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)

## Accessors

### name

> `get` **name**(): `string`

#### Returns

`string`

#### Source

[src/parser/recipient.ts:14](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L14)

***

### type

> `get` **type**(): `PronoteApiUserResourceType`

#### Returns

`PronoteApiUserResourceType`

#### Source

[src/parser/recipient.ts:18](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L18)

## Constructors

### new MessageRecipient()

> **new MessageRecipient**(`data`): [`MessageRecipient`](/api/classes/messagerecipient/)

#### Parameters

• **data**: `Omit`\<`PronoteApiUserMessageRecipient`, `"N"` \| `"P"` \| `"refusMess"`\>

#### Returns

[`MessageRecipient`](/api/classes/messagerecipient/)

#### Source

[src/parser/recipient.ts:9](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/recipient.ts#L9)
