---
editUrl: false
next: false
prev: false
title: "TimetableOverview"
---

## Constructors

### new TimetableOverview()

> **new TimetableOverview**(`client`, `data`): [`TimetableOverview`](/api/classes/timetableoverview/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **data**

• **data.ListeCours**: (`object` \| `object` \| `object`)[]

• **data.ParametreExportiCal?**: `string`

• **data.absences**

• **data.absences.joursCycle**: `PronoteValue`\<`Element`, `object`[]\>

• **data.absences.listeAbsences**: `PronoteValue`\<`Element`, []\>

• **data.absences.listeInfirmeries**: `PronoteValue`\<`Element`, []\>

• **data.absences.listePunitions**: `PronoteValue`\<`Element`, []\>

• **data.absences.listeRetards**: `PronoteValue`\<`Element`, []\>

• **data.avecCoursAnnule**: `boolean`

• **data.avecExportICal?**: `boolean`

• **data.debutDemiPensionHebdo**: `number`

• **data.finDemiPensionHebdo**: `number`

• **data.prefsGrille**

• **data.prefsGrille.genreRessource**: `number`

• **data.premierePlaceHebdoDuJour**: `number`

• **data.recreations**: `PronoteValue`\<`Element`, `object`[]\>

#### Returns

[`TimetableOverview`](/api/classes/timetableoverview/)

#### Source

[src/parser/timetable.ts:23](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetable.ts#L23)

## Methods

### parse()

> **parse**(`parameters`): [`TimetableClass`](/api/type-aliases/timetableclass/)[]

#### Parameters

• **parameters**: `TimetableOverviewParsingParameters`= `undefined`

#### Returns

[`TimetableClass`](/api/type-aliases/timetableclass/)[]

#### Source

[src/parser/timetable.ts:48](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/timetable.ts#L48)
