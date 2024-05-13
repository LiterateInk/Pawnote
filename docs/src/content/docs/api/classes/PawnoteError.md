---
editUrl: false
next: false
prev: false
title: "PawnoteError"
---

## Extends

- `Error`

## Constructors

### new PawnoteError()

> **new PawnoteError**(`message`, `code`): [`PawnoteError`](/api/classes/pawnoteerror/)

#### Parameters

• **message**: `string`

• **code**: [`NetworkFail`](/api/enumerations/pawnoteerrorcodes/#networkfail)

#### Returns

[`PawnoteError`](/api/classes/pawnoteerror/)

#### Overrides

`Error.constructor`

#### Source

[src/errors/constants.ts:6](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/errors/constants.ts#L6)

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:21

## Properties

### code

> **code**: [`NetworkFail`](/api/enumerations/pawnoteerrorcodes/#networkfail)

#### Source

[src/errors/constants.ts:6](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/errors/constants.ts#L6)

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Source

docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Source

docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Source

docs/node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### Inherited from

`Error.prepareStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Source

node\_modules/@types/node/globals.d.ts:30
