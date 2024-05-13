---
editUrl: false
next: false
prev: false
title: "ARDPartner"
---

## Extends

- `Partner`

## Accessors

### canRefreshData

> `get` **canRefreshData**(): `boolean`

#### Returns

`boolean`

#### Source

[src/parser/partners/ard.ts:57](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/partners/ard.ts#L57)

***

### code

> `get` **code**(): `string`

#### Returns

`string`

#### Source

[src/parser/partner.ts:21](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/partner.ts#L21)

***

### description

> `get` **description**(): `string`

#### Returns

`string`

#### Source

[src/parser/partner.ts:25](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/partner.ts#L25)

***

### linkLabel

> `get` **linkLabel**(): `string`

#### Returns

`string`

#### Source

[src/parser/partner.ts:29](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/partner.ts#L29)

***

### wallets

> `get` **wallets**(): [`ARDPartnerWallet`](/api/classes/ardpartnerwallet/)[]

#### Returns

[`ARDPartnerWallet`](/api/classes/ardpartnerwallet/)[]

#### Source

[src/parser/partners/ard.ts:61](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/partners/ard.ts#L61)

## Constructors

### new ARDPartner()

> **new ARDPartner**(`client`, `ard`): [`ARDPartner`](/api/classes/ardpartner/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **ard**

• **ard.SSO**: `PronoteSSO`

• **ard.avecActualisation**: `boolean`

• **ard.porteMonnaie**

• **ard.porteMonnaie.V**: `object`[]

• **ard.porteMonnaie.\_T**: `number`

#### Returns

[`ARDPartner`](/api/classes/ardpartner/)

#### Overrides

`Partner.constructor`

#### Source

[src/parser/partners/ard.ts:48](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/partners/ard.ts#L48)

## Methods

### fetchURL()

> **fetchURL**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

`Partner.fetchURL`

#### Source

[src/parser/partner.ts:17](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/partner.ts#L17)
