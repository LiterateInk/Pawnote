---
editUrl: false
next: false
prev: false
title: "Authorizations"
---

## Accessors

### canDiscuss

> `get` **canDiscuss**(): `boolean`

Whether the user is allowed to create messages in discussions.

#### Returns

`boolean`

#### Source

[src/parser/authorizations.ts:40](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L40)

***

### canDiscussWithParents

> `get` **canDiscussWithParents**(): `boolean`

Whether the user is allowed to discuss with parents.

#### Returns

`boolean`

#### Source

[src/parser/authorizations.ts:54](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L54)

***

### canDiscussWithStaff

> `get` **canDiscussWithStaff**(): `boolean`

Whether the user is allowed to discuss with staff.

#### Returns

`boolean`

#### Source

[src/parser/authorizations.ts:47](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L47)

***

### canDiscussWithStudents

> `get` **canDiscussWithStudents**(): `boolean`

Whether the user is allowed to discuss with students.

#### Returns

`boolean`

#### Source

[src/parser/authorizations.ts:61](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L61)

***

### canDiscussWithTeachers

> `get` **canDiscussWithTeachers**(): `boolean`

Whether the user is allowed to discuss with teachers.

#### Returns

`boolean`

#### Source

[src/parser/authorizations.ts:68](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L68)

***

### canReadDiscussions

> `get` **canReadDiscussions**(): `boolean`

Whether the user is allowed to read discussions.

#### Returns

`boolean`

#### Source

[src/parser/authorizations.ts:33](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L33)

***

### hasAdvancedDiscussionEditor

> `get` **hasAdvancedDiscussionEditor**(): `boolean`

Whether the user is allowed to send HTML through discussions.
Otherwise the user should send plain text.

#### Returns

`boolean`

#### Source

[src/parser/authorizations.ts:76](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L76)

***

### maxHomeworkFileUploadSize

> `get` **maxHomeworkFileUploadSize**(): `number`

The maximum file size allowed for homework uploads.

#### Example

```ts
4194304 // for 4MB.
```

#### Returns

`number`

#### Source

[src/parser/authorizations.ts:84](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L84)

## Constructors

### new Authorizations()

> **new Authorizations**(`data`): [`Authorizations`](/api/classes/authorizations/)

#### Parameters

• **data**

• **data.AvecDiscussion?**: `boolean`

Whether the user is allowed to read discussions or messages.

• **data.AvecDiscussionAvancee?**: `boolean`

Whether the user is allowed to send HTML through discussions.
Otherwise the API should send plain text : **if not checked properly, an
empty message will be sent**.

• **data.AvecDiscussionEleves?**: `boolean`

Is allowed to create discussions with students ?

**Available**
Teacher

• **data.AvecDiscussionParents?**: `boolean`

Is allowed to create discussions with students' parents ?

**Available**
Teacher

• **data.AvecDiscussionPersonnels?**: `boolean`

Is allowed to create discussions with staff ?

**Available**
Student | Teacher

• **data.AvecDiscussionProfesseurs?**: `boolean`

Is allowed to create discussions with teachers ?

**Available**
Student | Teacher

• **data.autoriserImpression**: `boolean`

• **data.compte**

• **data.compte.avecInformationsPersonnelles**: `boolean`

• **data.compte.avecSaisieMotDePasse**: `boolean`

• **data.consulterDonneesAdministrativesAutresEleves**: `boolean`

• **data.cours**

• **data.cours.domaineConsultationEDT**

• **data.cours.domaineConsultationEDT.V**: `string`

• **data.cours.domaineConsultationEDT.\_T**: `8`

• **data.cours.domaineModificationCours**

• **data.cours.domaineModificationCours.V**: `string`

• **data.cours.domaineModificationCours.\_T**: `8`

• **data.cours.masquerPartiesDeClasse**: `boolean`

• **data.discussionInterdit?**: `boolean`

Whether the user is disallowed to create discussions or messages.

• **data.incidents**: `unknown`

• **data.intendance**: `unknown`

• **data.services**: `unknown`

• **data.tailleMaxDocJointEtablissement**: `number`

• **data.tailleMaxRenduTafEleve**: `number`

#### Returns

[`Authorizations`](/api/classes/authorizations/)

#### Source

[src/parser/authorizations.ts:16](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/parser/authorizations.ts#L16)
