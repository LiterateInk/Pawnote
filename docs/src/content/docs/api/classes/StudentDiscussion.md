---
editUrl: false
next: false
prev: false
title: "StudentDiscussion"
---

## Accessors

### closed

> `get` **closed**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/discussion.ts:289](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L289)

***

### creator

> `get` **creator**(): `string`

#### Returns

`string`

#### Source

[src/parser/discussion.ts:284](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L284)

***

### dateAsFrenchText

> `get` **dateAsFrenchText**(): `string`

Output is very variable, see example below.
Because of this behavior, we can't transform this into a date.
Maybe, we could parse this manually, but it's not a priority.
TODO: Parse this manually.

#### Example

```ts
"lundi 08h53"
// or can just be the hour
"07h26"
```

#### Returns

`string`

#### Source

[src/parser/discussion.ts:259](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L259)

***

### deleted

> `get` **deleted**(): `boolean`

When `true`, you won't be able to access
any other property (except `participantsMessageID`) of this instance anymore.

#### Returns

`boolean`

#### Source

[src/parser/discussion.ts:232](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L232)

***

### folders

> `get` **folders**(): [`StudentDiscussionFolder`](/api/classes/studentdiscussionfolder/)[]

#### Returns

[`StudentDiscussionFolder`](/api/classes/studentdiscussionfolder/)[]

#### Source

[src/parser/discussion.ts:293](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L293)

***

### numberOfDrafts

> `get` **numberOfDrafts**(): `number`

#### Returns

`number`

#### Source

[src/parser/discussion.ts:244](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L244)

***

### numberOfMessages

> `get` **numberOfMessages**(): `number`

#### Returns

`number`

#### Source

[src/parser/discussion.ts:276](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L276)

***

### numberOfMessagesUnread

> `get` **numberOfMessagesUnread**(): `number`

#### Returns

`number`

#### Source

[src/parser/discussion.ts:280](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L280)

***

### participantsMessageID

> `get` **participantsMessageID**(): `string`

Internal string containing the ID of the message
needed to fetch the participants of the discussion.

#### Returns

`string`

#### Source

[src/parser/discussion.ts:301](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L301)

***

### possessions

> `get` **possessions**(): `object`[]

Property used internally to make the messages in
discussion request.

#### Returns

`object`[]

#### Source

[src/parser/discussion.ts:240](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L240)

***

### recipientName

> `get` **recipientName**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/parser/discussion.ts:271](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L271)

***

### subject

> `get` **subject**(): `string`

Title of the discussion.

#### Returns

`string`

#### Source

[src/parser/discussion.ts:267](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L267)

## Constructors

### new StudentDiscussion()

> **new StudentDiscussion**(`client`, `data`, `discussionsOverview`): [`StudentDiscussion`](/api/classes/studentdiscussion/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **data**

• **discussionsOverview**: [`StudentDiscussionsOverview`](/api/classes/studentdiscussionsoverview/)

#### Returns

[`StudentDiscussion`](/api/classes/studentdiscussion/)

#### Source

[src/parser/discussion.ts:138](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L138)

## Methods

### deletePermanently()

> **deletePermanently**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/discussion.ts:216](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L216)

***

### fetchMessagesOverview()

> **fetchMessagesOverview**(`markAsRead`, `limit`): `Promise`\<[`MessagesOverview`](/api/classes/messagesoverview/)\>

Fetches the messages from the discussion.
By default it won't mark the messages as read even after fetching them.

You can change this behavior by setting `markAsRead` to `true`.
There's no other way to mark the messages as read.

#### Parameters

• **markAsRead**: `boolean`= `false`

Whether to mark the messages as read after fetching them.

• **limit**: `number`= `0`

0 = no limit, fetch all messages.

#### Returns

`Promise`\<[`MessagesOverview`](/api/classes/messagesoverview/)\>

#### Source

[src/parser/discussion.ts:172](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L172)

***

### fetchRecipients()

> **fetchRecipients**(): `Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

Fetches the recipients of the discussion.
A recipient is someone who is part of the discussion.
They don't have to send a message to be considered as a recipient.

#### Returns

`Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

#### Source

[src/parser/discussion.ts:189](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L189)

***

### markAsRead()

> **markAsRead**(): `Promise`\<`void`\>

Marks the discussion as read.

#### Returns

`Promise`\<`void`\>

#### Remark

This function is a shortcut to `fetchMessages(true)` but here we don't return anything.

#### Source

[src/parser/discussion.ts:180](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L180)

***

### moveToTrash()

> **moveToTrash**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/discussion.ts:194](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L194)

***

### refetch()

> **refetch**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/discussion.ts:133](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L133)

***

### restoreFromTrash()

> **restoreFromTrash**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/discussion.ts:205](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/discussion.ts#L205)
