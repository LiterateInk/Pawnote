---
editUrl: false
next: false
prev: false
title: "defaultPawnoteFetcher"
---

> **defaultPawnoteFetcher**(`url`, `options`): `Promise`\<`object`\>

Simple and default fetcher using `fetch` if none was given
in the authentication function.

## Parameters

• **url**: `string`

• **options**

• **options.body?**: `string` \| `FormData`

Body of the request of type given in the "Content-Type" header.

• **options.headers?**: `Record`\<`string`, `string`\> \| `Headers`

Headers that should be appended to the request.

• **options.method**: `"GET"` \| `"POST"`

• **options.redirect?**: `"follow"` \| `"manual"`

Whether we should automatically handle the redirections or do it by hand.

## Returns

`Promise`\<`object`\>

### headers

> **headers**: `Record`\<`string`, `string`\> \| `Headers`

### json()

> **json**: \<`T`\>() => `Promise`\<`T`\>

#### Type parameters

• **T**

#### Returns

`Promise`\<`T`\>

### text()

> **text**: () => `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

## Source

[src/utils/fetcher.ts:45](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/utils/fetcher.ts#L45)
