---
editUrl: false
next: false
prev: false
title: "SentMessage"
---

## Extends

- [`Message`](/api/classes/message/)

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

***

### replyingToMessage

> `get` **replyingToMessage**(): `undefined` \| [`SentMessage`](/api/classes/sentmessage/)

#### Returns

`undefined` \| [`SentMessage`](/api/classes/sentmessage/)

#### Source

[src/parser/messages.ts:374](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L374)

***

### transferredMessages

> `get` **transferredMessages**(): [`TransferredMessage`](/api/classes/transferredmessage/)[]

#### Returns

[`TransferredMessage`](/api/classes/transferredmessage/)[]

#### Source

[src/parser/messages.ts:378](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L378)

## Constructors

### new SentMessage()

> **new SentMessage**(`client`, `messagesOverview`, `data`): [`SentMessage`](/api/classes/sentmessage/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **messagesOverview**: [`MessagesOverview`](/api/classes/messagesoverview/)

• **data**: `PronoteApiSentMessage`

#### Returns

[`SentMessage`](/api/classes/sentmessage/)

#### Overrides

`Message.constructor`

#### Source

[src/parser/messages.ts:352](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L352)

## Methods

### draftReply()

> **draftReply**(`content`): `Promise`\<`void`\>

#### Parameters

• **content**: `string`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:370](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L370)

***

### getRecipients()

> **getRecipients**(): `Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

#### Returns

`Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

#### Inherited from

[`Message`](/api/classes/message/).[`getRecipients`](/api/classes/message/#getrecipients)

#### Source

[src/parser/messages.ts:292](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L292)

***

### reply()

> **reply**(`content`, `includeParentsAndStudents`): `Promise`\<`void`\>

#### Parameters

• **content**: `string`

• **includeParentsAndStudents**: `boolean`= `false`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:366](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L366)
