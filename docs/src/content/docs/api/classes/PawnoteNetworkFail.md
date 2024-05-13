---
editUrl: false
next: false
prev: false
title: "PawnoteNetworkFail"
---

## Extends

- [`PawnoteError`](/api/classes/pawnoteerror/)

## Constructors

### new PawnoteNetworkFail()

> **new PawnoteNetworkFail**(): [`PawnoteNetworkFail`](/api/classes/pawnotenetworkfail/)

#### Returns

[`PawnoteNetworkFail`](/api/classes/pawnotenetworkfail/)

#### Overrides

[`PawnoteError`](/api/classes/pawnoteerror/).[`constructor`](/api/classes/pawnoteerror/#constructors)

#### Source

[src/errors/NetworkFail.ts:4](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/errors/NetworkFail.ts#L4)

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

[`PawnoteError`](/api/classes/pawnoteerror/).[`captureStackTrace`](/api/classes/pawnoteerror/#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21

## Properties

### code

> **code**: [`NetworkFail`](/api/enumerations/pawnoteerrorcodes/#networkfail)

#### Inherited from

[`PawnoteError`](/api/classes/pawnoteerror/).[`code`](/api/classes/pawnoteerror/#code)

#### Source

[src/errors/constants.ts:6](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/errors/constants.ts#L6)

***

### message

> **message**: `string`

#### Inherited from

[`PawnoteError`](/api/classes/pawnoteerror/).[`message`](/api/classes/pawnoteerror/#message)

#### Source

docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`PawnoteError`](/api/classes/pawnoteerror/).[`name`](/api/classes/pawnoteerror/#name)

#### Source

docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`PawnoteError`](/api/classes/pawnoteerror/).[`stack`](/api/classes/pawnoteerror/#stack)

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

[`PawnoteError`](/api/classes/pawnoteerror/).[`prepareStackTrace`](/api/classes/pawnoteerror/#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`PawnoteError`](/api/classes/pawnoteerror/).[`stackTraceLimit`](/api/classes/pawnoteerror/#stacktracelimit)

#### Source

node\_modules/@types/node/globals.d.ts:30
