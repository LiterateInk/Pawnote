---
editUrl: false
next: false
prev: false
title: "MessagesOverview"
---

## Accessors

### canIncludeStudentsAndParents

> `get` **canIncludeStudentsAndParents**(): `boolean`

Whether the button "include students and parents"
appears on the UI or not.

#### Returns

`boolean`

#### Source

[src/parser/messages.ts:206](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L206)

***

### defaultReplyMessageID

> `get` **defaultReplyMessageID**(): `string`

#### Returns

`string`

#### Source

[src/parser/messages.ts:133](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L133)

***

### messages

> `get` **messages**(): [`SentMessage`](/api/classes/sentmessage/)[]

#### Returns

[`SentMessage`](/api/classes/sentmessage/)[]

#### Source

[src/parser/messages.ts:137](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L137)

***

### savedDrafts

> `get` **savedDrafts**(): [`DraftMessage`](/api/classes/draftmessage/)[]

#### Returns

[`DraftMessage`](/api/classes/draftmessage/)[]

#### Source

[src/parser/messages.ts:141](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L141)

## Constructors

### new MessagesOverview()

> **new MessagesOverview**(`client`, `clientQueue`, `clientSession`, `discussion`, `data`, `fetchLimit`): [`MessagesOverview`](/api/classes/messagesoverview/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **clientQueue**: `default`

• **clientSession**: `Session`

• **discussion**: [`StudentDiscussion`](/api/classes/studentdiscussion/)

• **data**

• **data.donnees**

• **data.donnees.brouillon?**: `PronoteValue`\<`24`, `object`\>

• **data.donnees.listeBoutons**: `PronoteValue`\<`24`, `object`[]\>

• **data.donnees.listeMessages**: `PronoteValue`\<`24`, (`PronoteApiMessage` \| `PronoteApiSentMessage`)[]\>

• **data.donnees.messagePourReponse**: `PronoteValue`\<`24`, `object`\>

• **data.donnees.nbMarquerLu?**: `number`

Is defined only when `marquerCommeLu` is set to `true` in the payload.

• **data.donnees.nbPossessionsMessage**: `number`

• **data.nom**: `Messages`

• **fetchLimit**: `number`= `0`

#### Returns

[`MessagesOverview`](/api/classes/messagesoverview/)

#### Source

[src/parser/messages.ts:110](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L110)

## Methods

### deleteDraft()

> **deleteDraft**(`draft`): `Promise`\<`void`\>

#### Parameters

• **draft**: [`DraftMessage`](/api/classes/draftmessage/)

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:178](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L178)

***

### draftMessage()

> **draftMessage**(`content`, `replyTo`): `Promise`\<`void`\>

#### Parameters

• **content**: `string`

• **replyTo**: `string`= `undefined`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:156](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L156)

***

### patchDraft()

> **patchDraft**(`draft`): `Promise`\<`void`\>

#### Parameters

• **draft**: [`DraftMessage`](/api/classes/draftmessage/)

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:167](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L167)

***

### refetch()

> **refetch**(`limit`): `Promise`\<`void`\>

#### Parameters

• **limit**: `number`= `undefined`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:31](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L31)

***

### sendDraft()

> **sendDraft**(`draft`, `includeParentsAndStudents`): `Promise`\<`void`\>

#### Parameters

• **draft**: [`DraftMessage`](/api/classes/draftmessage/)

• **includeParentsAndStudents**: `boolean`= `false`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:187](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L187)

***

### sendMessage()

> **sendMessage**(`content`, `includeParentsAndStudents`, `replyTo`): `Promise`\<`void`\>

Will send a message to the discussion and refetch the messages
internally so properties are automatically updated.

#### Parameters

• **content**: `string`

• **includeParentsAndStudents**: `boolean`= `false`

• **replyTo**: `string`= `undefined`

#### Returns

`Promise`\<`void`\>

#### Source

[src/parser/messages.ts:149](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/messages.ts#L149)
