---
editUrl: false
next: false
prev: false
title: "StudentGrade"
---

## Accessors

### average

> `get` **average**(): `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

the average of the class

#### Returns

`number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

#### Source

[src/parser/grade.ts:97](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L97)

***

### coefficient

> `get` **coefficient**(): `number`

the coefficient of the grade

#### Returns

`number`

#### Source

[src/parser/grade.ts:112](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L112)

***

### comment

> `get` **comment**(): `string`

comment on the grade description

#### Returns

`string`

#### Source

[src/parser/grade.ts:117](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L117)

***

### correctionFile

> `get` **correctionFile**(): `undefined` \| [`StudentAttachment`](/api/classes/studentattachment/)

the file of the correction

#### Returns

`undefined` \| [`StudentAttachment`](/api/classes/studentattachment/)

#### Source

[src/parser/grade.ts:142](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L142)

***

### date

> `get` **date**(): `Date`

the date on which the grade was given

#### Returns

`Date`

#### Source

[src/parser/grade.ts:87](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L87)

***

### defaultOutOf

> `get` **defaultOutOf**(): `undefined` \| `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

the default maximum amount of points

#### Returns

`undefined` \| `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

#### Source

[src/parser/grade.ts:82](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L82)

***

### id

> `get` **id**(): `string`

the id of the grade (used internally)

#### Returns

`string`

#### Source

[src/parser/grade.ts:67](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L67)

***

### isBonus

> `get` **isBonus**(): `boolean`

is the grade bonus : only points above 10 count

#### Returns

`boolean`

#### Source

[src/parser/grade.ts:122](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L122)

***

### isOptional

> `get` **isOptional**(): `boolean`

is the grade optional : the grade only counts if it increases the average

#### Returns

`boolean`

#### Source

[src/parser/grade.ts:127](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L127)

***

### isOutOf20

> `get` **isOutOf20**(): `boolean`

is the grade out of 20. Example 8/10 -> 16/20

#### Returns

`boolean`

#### Source

[src/parser/grade.ts:132](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L132)

***

### max

> `get` **max**(): `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

the highest grade

#### Returns

`number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

#### Source

[src/parser/grade.ts:102](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L102)

***

### min

> `get` **min**(): `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

the lowest grade

#### Returns

`number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

#### Source

[src/parser/grade.ts:107](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L107)

***

### outOf

> `get` **outOf**(): `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

the maximum amount of points

#### Returns

`number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

#### Source

[src/parser/grade.ts:77](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L77)

***

### subject

> `get` **subject**(): [`StudentSubject`](/api/classes/studentsubject/)

the subject in which the grade was given

#### Returns

[`StudentSubject`](/api/classes/studentsubject/)

#### Source

[src/parser/grade.ts:92](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L92)

***

### subjectFile

> `get` **subjectFile**(): `undefined` \| [`StudentAttachment`](/api/classes/studentattachment/)

the file of the subject

#### Returns

`undefined` \| [`StudentAttachment`](/api/classes/studentattachment/)

#### Source

[src/parser/grade.ts:137](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L137)

***

### value

> `get` **value**(): `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

the actual grade

#### Returns

`number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

#### Source

[src/parser/grade.ts:72](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L72)

## Constructors

### new StudentGrade()

> **new StudentGrade**(`client`, `grade`): [`StudentGrade`](/api/classes/studentgrade/)

#### Parameters

• **client**: [`Pronote`](/api/classes/pronote/)

• **grade**

• **grade.G**: `number`

• **grade.ListeThemes**

• **grade.ListeThemes.V**: `unknown`[]

• **grade.ListeThemes.\_T**: `24`

• **grade.N**: `string`

• **grade.bareme**

• **grade.bareme.V**: `string`

The maximum grade value.

• **grade.bareme.\_T**: `10`

• **grade.baremeParDefaut**

• **grade.baremeParDefaut.V**: `string`

• **grade.baremeParDefaut.\_T**: `10`

• **grade.coefficient**: `number`

• **grade.commentaire**: `string`

Description of the exam.

• **grade.date**

• **grade.date.V**: `string`

Date in "DD/MM/YYYY" format.

• **grade.date.\_T**: `7`

• **grade.estBonus**: `boolean`

• **grade.estEnGroupe**: `boolean`

• **grade.estFacultatif**: `boolean`

• **grade.estRamenerSur20**: `boolean`

• **grade.executionQCM?**

Available when the grade was based on a quiz.

• **grade.executionQCM.V**

• **grade.executionQCM.V.G**: `number`

• **grade.executionQCM.V.ListeThemes**

• **grade.executionQCM.V.ListeThemes.V**: `unknown`[]

• **grade.executionQCM.V.ListeThemes.\_T**: `24`

• **grade.executionQCM.V.N**: `string`

• **grade.executionQCM.V.QCM**

• **grade.executionQCM.V.QCM.V**

• **grade.executionQCM.V.QCM.V.G**: `number`

• **grade.executionQCM.V.QCM.V.L**: `string`

Name of the quiz.

• **grade.executionQCM.V.QCM.V.N**: `string`

• **grade.executionQCM.V.QCM.V.avecQuestionsSoumises**: `boolean`

• **grade.executionQCM.V.QCM.V.nbCompetencesTotal**: `number`

• **grade.executionQCM.V.QCM.V.nbQuestionsTotal**: `number`

Number of questions.

• **grade.executionQCM.V.QCM.V.nombreDePointsTotal**: `number`

Maximum amout of points.

• **grade.executionQCM.V.QCM.V.nombreQuestObligatoires**: `number`

• **grade.executionQCM.V.QCM.\_T**: `24`

• **grade.executionQCM.V.acceptIncomplet**: `boolean`

• **grade.executionQCM.V.afficherResultatNiveauMaitrise**: `boolean`

• **grade.executionQCM.V.afficherResultatNote**: `boolean`

• **grade.executionQCM.V.autoriserLaNavigation**: `boolean`

• **grade.executionQCM.V.coefficientDevoir**

• **grade.executionQCM.V.coefficientDevoir.V**: `string`

• **grade.executionQCM.V.coefficientDevoir.\_T**: `10`

• **grade.executionQCM.V.consigne**

• **grade.executionQCM.V.consigne.V**: `string`

• **grade.executionQCM.V.consigne.\_T**: `21`

• **grade.executionQCM.V.dateDebutPublication**

• **grade.executionQCM.V.dateDebutPublication.V**: `string`

Date in format "DD/MM/YYYY HH:mm:ss".

• **grade.executionQCM.V.dateDebutPublication.\_T**: `7`

• **grade.executionQCM.V.dateFinPublication**

• **grade.executionQCM.V.dateFinPublication.V**: `string`

Date in format "DD/MM/YYYY HH:mm:ss".

• **grade.executionQCM.V.dateFinPublication.\_T**: `7`

• **grade.executionQCM.V.dureeMaxQCM**: `number`

• **grade.executionQCM.V.estDemarre**: `boolean`

• **grade.executionQCM.V.estEnPublication**: `boolean`

• **grade.executionQCM.V.estLieADevoir**: `boolean`

• **grade.executionQCM.V.estLieAEvaluation**: `boolean`

• **grade.executionQCM.V.estSupprimable**: `boolean`

• **grade.executionQCM.V.estUnTAF**: `boolean`

• **grade.executionQCM.V.etatCloture**: `number`

• **grade.executionQCM.V.fichierDispo**: `boolean`

• **grade.executionQCM.V.homogeneiserNbQuestParNiveau**: `boolean`

• **grade.executionQCM.V.listeProfesseurs**

• **grade.executionQCM.V.listeProfesseurs.V**: `object`[]

• **grade.executionQCM.V.listeProfesseurs.\_T**: `24`

• **grade.executionQCM.V.melangerLesQuestionsGlobalement**: `boolean`

• **grade.executionQCM.V.melangerLesQuestionsParNiveau**: `boolean`

• **grade.executionQCM.V.melangerLesReponses**: `boolean`

• **grade.executionQCM.V.modeDiffusionCorrige**: `number`

• **grade.executionQCM.V.nbQuestBonnes**: `number`

• **grade.executionQCM.V.nbQuestRepondues**: `number`

• **grade.executionQCM.V.nomPublic**: `string`

• **grade.executionQCM.V.nombreDePoints**: `number`

• **grade.executionQCM.V.nombreQuestionsSoumises**: `number`

• **grade.executionQCM.V.noteQCM**

• **grade.executionQCM.V.noteQCM.V**: `string`

• **grade.executionQCM.V.noteQCM.\_T**: `10`

• **grade.executionQCM.V.pointsSelonPourcentage**: `boolean`

• **grade.executionQCM.V.publierCorrige**: `boolean`

• **grade.executionQCM.V.ramenerSur20**: `boolean`

• **grade.executionQCM.V.ressentiRepondant**: `boolean`

• **grade.executionQCM.V.service**

• **grade.executionQCM.V.service.V**

• **grade.executionQCM.V.service.V.L**: `string`

• **grade.executionQCM.V.service.V.N**: `string`

• **grade.executionQCM.V.service.\_T**: `24`

• **grade.executionQCM.V.tolererFausses**: `boolean`

• **grade.executionQCM.\_T**: `24`

• **grade.libelleCorrige?**: `string`

Name of the correction file.

• **grade.libelleSujet?**: `string`

Name of the subject file.

• **grade.moyenne**

• **grade.moyenne.V**: `string`

Overall grade on this exam.

• **grade.moyenne.\_T**: `10`

• **grade.note**

• **grade.note.V**: `string`

Grade the user had.

• **grade.note.\_T**: `number`

• **grade.noteMax**

• **grade.noteMax.V**: `string`

Best grade someone had.

• **grade.noteMax.\_T**: `10`

• **grade.noteMin**

• **grade.noteMin.V**: `string`

Worst grade someone had.

• **grade.noteMin.\_T**: `10`

• **grade.periode**

• **grade.periode.V**

• **grade.periode.V.L**: `string`

• **grade.periode.V.N**: `string`

• **grade.periode.\_T**: `24`

• **grade.service**

• **grade.service.V**

• **grade.service.V.G**: `12`

• **grade.service.V.L**: `string`

• **grade.service.V.N**: `string`

• **grade.service.V.couleur**: `string`

• **grade.service.\_T**: `24`

#### Returns

[`StudentGrade`](/api/classes/studentgrade/)

#### Source

[src/parser/grade.ts:29](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/grade.ts#L29)
