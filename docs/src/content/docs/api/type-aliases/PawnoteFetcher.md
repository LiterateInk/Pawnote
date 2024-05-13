---
editUrl: false
next: false
prev: false
title: "PawnoteFetcher"
---

> **PawnoteFetcher**: (`url`, `options`) => `Promise`\<`object`\>

A fetcher that looks like the Fetch API
so every fetcher applied to Pawnote will have the
same API and should output the same thing.

## Example

```ts
import type { PawnoteFetcher } from "pawnote";

// With the `fetch()` builtin, in TypeScript.
// This is actually the code for the default fetcher.
const fetcher: PawnoteFetcher = async (url, options) => {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    redirect: options.redirect,
    // Setting a body is not allowed on GET requests.
    body: (options.method === "GET") ? void 0 : options.body
  });

  return {
    headers: response.headers,
    text: () => response.text(),
    json: <T>() => response.json() as T
  };
};
```

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

[src/utils/fetcher.ts:27](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/utils/fetcher.ts#L27)
