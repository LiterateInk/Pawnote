---
editUrl: false
next: false
prev: false
title: "getPronoteInstanceInformation"
---

> **getPronoteInstanceInformation**(`fetcher`, `input`): `Promise`\<`object`\>

Takes an instance URL and return informations about it such as...
- available account types ;
- instance name ;
- base URL and potential ENT URL

## Parameters

• **fetcher**: [`PawnoteFetcher`](/api/type-aliases/pawnotefetcher/)

• **input**

• **input.pronoteURL**: `string`

## Returns

`Promise`\<`object`\>

### accounts

> **accounts**: `object`[]

### entToken?

> `optional` **entToken**: `string`

Used to generate new temporary passwords for Pronote after ENT login.

### entURL?

> `optional` **entURL**: `string`

URL of the ENT we have to handle.

### pronoteRootURL

> **pronoteRootURL**: `string`

### schoolName

> **schoolName**: `string`

### version

> **version**: `number`

## Source

[src/api/instance/index.ts:21](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/api/instance/index.ts#L21)
