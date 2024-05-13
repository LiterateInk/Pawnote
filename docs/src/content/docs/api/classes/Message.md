---
editUrl: false
next: false
prev: false
title: "Message"
---

## Extended by

- [`SentMessage`](/api/classes/sentmessage/)
- [`TransferredMessage`](/api/classes/transferredmessage/)

## Accessors

### amountOfRecipients

> `get` **amountOfRecipients**(): `number`

#### Remark

The author is also counted as a recipient.

#### Example

```ts
// In the situation when there's you and a teacher.
message.amountOfRecipients === 2; // 1 (you) + 1 (teacher)
```

#### Returns

`number`

#### Source

[src/parser/messages.ts:332](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L332)

***

### author

> `get` **author**(): [`MessageRecipient`](/api/classes/messagerecipient/)

#### Returns

[`MessageRecipient`](/api/classes/messagerecipient/)

#### Source

[src/parser/messages.ts:308](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L308)

***

### content

> `get` **content**(): `string`

#### Returns

`string`

#### Source

[src/parser/messages.ts:300](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L300)

***

### created

> `get` **created**(): `Date`

#### Returns

`Date`

#### Source

[src/parser/messages.ts:304](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L304)

***

### files

> `get` **files**(): [`StudentAttachment`](/api/classes/studentattachment/)[]

#### Returns

[`StudentAttachment`](/api/classes/studentattachment/)[]

#### Source

[src/parser/messages.ts:336](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L336)

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/parser/messages.ts:296](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L296)

***

### partialVisibility

> `get` **partialVisibility**(): `boolean`

`true` when only some people can see the message.

#### Returns

`boolean`

#### Source

[src/parser/messages.ts:322](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L322)

***

### receiver

> `get` **receiver**(): `undefined` \| [`MessageRecipient`](/api/classes/messagerecipient/)

#### Remark

`undefined` when there's more than two recipients.

#### Returns

`undefined` \| [`MessageRecipient`](/api/classes/messagerecipient/)

#### Source

[src/parser/messages.ts:315](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L315)

## Methods

### getRecipients()

> **getRecipients**(): `Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

#### Returns

`Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

#### Source

[src/parser/messages.ts:292](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L292)
