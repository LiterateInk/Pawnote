---
editUrl: false
next: false
prev: false
title: "Pronote"
---

A reprensentation of the Pronote client.
## Table of contents
- [Constructor](#constructor)
- [Instance Informations](#instance-informations)
- [Key Dates](#key-dates)
- [Discussions](#discussions)
- [Grades and Evaluations](grades-and-evaluations)
- [Homework](#homework)
- [News](#news)
- [Periods](#periods)
- [Ressources](#ressources)
- [Timetable](#timetable)
- [User Informations](#user-informations)
- [Utils](#utils)
- [Not for normal uses](#not-for-normal-uses)

## Constructor

How `Pronote` Class instance is created.

### new Pronote()

> **new Pronote**(`fetcher`, `session`, `credentials`, `user`, `loginInformations`): [`Pronote`](/api/classes/pronote/)

#### Parameters

• **fetcher**: [`PawnoteFetcher`](/api/type-aliases/pawnotefetcher/)

Custom fetcher to call the API with another API than fetch.

• **session**: `Session`

Represent the user session.

• **credentials**: `NextAuthenticationCredentials`

A Object containing the username and the nextAuth token.

• **user**

The user data.

• **user.autorisationKiosque**: `boolean`

• **user.autorisations**

Authorization for the current student.

• **user.autorisations.AvecDiscussion?**: `boolean`

Whether the user is allowed to read discussions or messages.

• **user.autorisations.AvecDiscussionAvancee?**: `boolean`

Whether the user is allowed to send HTML through discussions.
Otherwise the API should send plain text : **if not checked properly, an
empty message will be sent**.

• **user.autorisations.AvecDiscussionEleves?**: `boolean`

Is allowed to create discussions with students ?

**Available**
Teacher

• **user.autorisations.AvecDiscussionParents?**: `boolean`

Is allowed to create discussions with students' parents ?

**Available**
Teacher

• **user.autorisations.AvecDiscussionPersonnels?**: `boolean`

Is allowed to create discussions with staff ?

**Available**
Student | Teacher

• **user.autorisations.AvecDiscussionProfesseurs?**: `boolean`

Is allowed to create discussions with teachers ?

**Available**
Student | Teacher

• **user.autorisations.autoriserImpression**: `boolean`

• **user.autorisations.compte**

• **user.autorisations.compte.avecInformationsPersonnelles**: `boolean`

• **user.autorisations.compte.avecSaisieMotDePasse**: `boolean`

• **user.autorisations.consulterDonneesAdministrativesAutresEleves**: `boolean`

• **user.autorisations.cours**

• **user.autorisations.cours.domaineConsultationEDT**

• **user.autorisations.cours.domaineConsultationEDT.V**: `string`

• **user.autorisations.cours.domaineConsultationEDT.\_T**: `8`

• **user.autorisations.cours.domaineModificationCours**

• **user.autorisations.cours.domaineModificationCours.V**: `string`

• **user.autorisations.cours.domaineModificationCours.\_T**: `8`

• **user.autorisations.cours.masquerPartiesDeClasse**: `boolean`

• **user.autorisations.discussionInterdit?**: `boolean`

Whether the user is disallowed to create discussions or messages.

• **user.autorisations.incidents**: `unknown`

• **user.autorisations.intendance**: `unknown`

• **user.autorisations.services**: `unknown`

• **user.autorisations.tailleMaxDocJointEtablissement**: `number`

• **user.autorisations.tailleMaxRenduTafEleve**: `number`

• **user.autorisationsSession**

• **user.autorisationsSession.fonctionnalites**

• **user.autorisationsSession.fonctionnalites.attestationEtendue**: `boolean`

• **user.autorisationsSession.fonctionnalites.gestionTwitter**: `boolean`

• **user.listeInformationsEtablissements**

Informations about school.

• **user.listeInformationsEtablissements.V**: `object`[]

• **user.listeInformationsEtablissements.\_T**: `24`

• **user.listeOnglets**: `object`[]

• **user.listeOngletsInvisibles**: `number`[]

• **user.listeOngletsNotification**: `number`[]

• **user.parametresUtilisateur**

User settings.

• **user.parametresUtilisateur.Communication**

• **user.parametresUtilisateur.Communication.DiscussionNonLues**: `false`

• **user.parametresUtilisateur.EDT**

Settings for the timetable.

• **user.parametresUtilisateur.EDT.afficherCoursAnnules**: `boolean`

Show canceled classes.

• **user.parametresUtilisateur.EDT.axeInverseEDT**: `boolean`

Swap time and day position.

• **user.parametresUtilisateur.EDT.axeInversePlanningHebdo**: `boolean`

• **user.parametresUtilisateur.EDT.axeInversePlanningJour**: `boolean`

• **user.parametresUtilisateur.EDT.axeInversePlanningJour2**: `boolean`

• **user.parametresUtilisateur.EDT.nbJours**: `number`

• **user.parametresUtilisateur.EDT.nbJoursEDT**: `number`

• **user.parametresUtilisateur.EDT.nbRessources**: `number`

• **user.parametresUtilisateur.EDT.nbSequences**: `number`

• **user.parametresUtilisateur.theme**

User's current theme.

• **user.parametresUtilisateur.theme.theme**: `number`

• **user.parametresUtilisateur.version**: `number`

• **user.reglesSaisieMDP**

• **user.reglesSaisieMDP.max**: `number`

• **user.reglesSaisieMDP.min**: `number`

• **user.reglesSaisieMDP.regles**

• **user.reglesSaisieMDP.regles.V**: `string`

Array of numbers ?

• **user.reglesSaisieMDP.regles.\_T**: `26`

• **user.ressource**

• **user.ressource.Etablissement**

• **user.ressource.Etablissement.V**

• **user.ressource.Etablissement.V.L**: `string`

School name.

• **user.ressource.Etablissement.V.N**: `string`

School ID.

• **user.ressource.Etablissement.\_T**: `24`

• **user.ressource.G**: `PronoteApiUserResourceType`

• **user.ressource.L**: `string`

Account name.

• **user.ressource.N**: `string`

Account ID.

• **user.ressource.P**: `number`

• **user.ressource.avecPhoto**: `boolean`

Student have a profile picture.

• **user.ressource.classeDEleve**

Class of the student.

• **user.ressource.classeDEleve.L**: `string`

Class name.

• **user.ressource.classeDEleve.N**: `string`

Class ID.

• **user.ressource.estDelegue?**: `boolean`

• **user.ressource.estMembreCA?**: `boolean`

• **user.ressource.listeClassesHistoriques**

• **user.ressource.listeClassesHistoriques.V**: `object`[]

• **user.ressource.listeClassesHistoriques.\_T**: `24`

• **user.ressource.listeGroupes**

List of student groups.

• **user.ressource.listeGroupes.V**: `object`[]

• **user.ressource.listeGroupes.\_T**: `24`

• **user.ressource.listeOngletsPourPeriodes**

• **user.ressource.listeOngletsPourPeriodes.V**: `object`[]

• **user.ressource.listeOngletsPourPeriodes.\_T**: `24`

• **user.ressource.listeOngletsPourPiliers**

• **user.ressource.listeOngletsPourPiliers.V**

• **user.ressource.listeOngletsPourPiliers.V.G**: `45`

• **user.ressource.listeOngletsPourPiliers.V.listePaliers**

• **user.ressource.listeOngletsPourPiliers.V.listePaliers.V**: `object`[]

• **user.ressource.listeOngletsPourPiliers.V.listePaliers.\_T**: `24`

• **user.ressource.listeOngletsPourPiliers.\_T**: `24`

• **user.tabEtablissementsModeleGrille**: `unknown`[]

• **loginInformations**

A lot of informations from the first login request

• **loginInformations.\_Signature\_**

• **loginInformations.\_Signature\_.ModeExclusif**: `boolean`

• **loginInformations.donnees**

• **loginInformations.donnees.DateServeurHttp**

Time on the server when the request was made.

• **loginInformations.donnees.DateServeurHttp.V**: `string`

In the following format : `DD/MM/YYYY HH:mm:ss`

• **loginInformations.donnees.DateServeurHttp.\_T**: `7`

• **loginInformations.donnees.General**

• **loginInformations.donnees.General.ActivationMessagerieEntreParents**: `boolean`

• **loginInformations.donnees.General.AfficherAbbreviationNiveauDAcquisition**: `boolean`

• **loginInformations.donnees.General.AnneeScolaire**: `string`

• **loginInformations.donnees.General.AvecChoixConnexion**: `boolean`

• **loginInformations.donnees.General.AvecElevesRattaches**: `boolean`

• **loginInformations.donnees.General.AvecEvaluationHistorique**: `boolean`

• **loginInformations.donnees.General.AvecGestionNiveauxCECRL**: `boolean`

• **loginInformations.donnees.General.AvecHeuresPleinesApresMidi**: `boolean`

• **loginInformations.donnees.General.AvecRecuperationInfosConnexion**: `boolean`

• **loginInformations.donnees.General.BaremeNotation**

• **loginInformations.donnees.General.BaremeNotation.V**: `string`

• **loginInformations.donnees.General.BaremeNotation.\_T**: `10`

• **loginInformations.donnees.General.DemiJourneesOuvrees**: `object`[]

• **loginInformations.donnees.General.DerniereDate**

• **loginInformations.donnees.General.DerniereDate.V**: `string`

• **loginInformations.donnees.General.DerniereDate.\_T**: `7`

• **loginInformations.donnees.General.DomainesFrequences**: `Record`\<`PronoteApiDomainFrequencyType`, `PronoteValue`\<`Element`, `string`\>\>

**Example**
```ts
// A value can look like this :
"[1..7,10..16,19..25,28..33,36..44]"
// Can be read in Pawnote using the internal `parseSelection()` function.
```

• **loginInformations.donnees.General.DureeSequence**: `number`

• **loginInformations.donnees.General.GestionParcoursExcellence**: `boolean`

• **loginInformations.donnees.General.JourOuvre**

• **loginInformations.donnees.General.JourOuvre.V**: `string`

• **loginInformations.donnees.General.JourOuvre.\_T**: `7`

• **loginInformations.donnees.General.JourOuvres**

• **loginInformations.donnees.General.JourOuvres.V**: `string`

• **loginInformations.donnees.General.JourOuvres.\_T**: `11`

• **loginInformations.donnees.General.JoursDemiPension**

• **loginInformations.donnees.General.JoursDemiPension.V**: `string`

• **loginInformations.donnees.General.JoursDemiPension.\_T**: `26`

• **loginInformations.donnees.General.LibellesFrequences**: `Record`\<`PronoteApiDomainFrequencyType`, `string`\>

• **loginInformations.donnees.General.ListeHeures**

• **loginInformations.donnees.General.ListeHeures.V**: `object`[]

• **loginInformations.donnees.General.ListeHeures.\_T**: `24`

• **loginInformations.donnees.General.ListeHeuresFin**

• **loginInformations.donnees.General.ListeHeuresFin.V**: `object`[]

• **loginInformations.donnees.General.ListeHeuresFin.\_T**: `24`

• **loginInformations.donnees.General.ListeNiveauxDAcquisitions**

• **loginInformations.donnees.General.ListeNiveauxDAcquisitions.V**: `object`[]

• **loginInformations.donnees.General.ListeNiveauxDAcquisitions.\_T**: `24`

• **loginInformations.donnees.General.ListePeriodes**: `object`[]

• **loginInformations.donnees.General.NeComptabiliserQueEvalsAnneeScoDsValidAuto**: `boolean`

• **loginInformations.donnees.General.NomEtablissement**: `string`

• **loginInformations.donnees.General.NomEtablissementConnexion**: `string`

• **loginInformations.donnees.General.PlaceDemiJourneeAbsence**: `number`

• **loginInformations.donnees.General.PlacesParHeure**: `number`

• **loginInformations.donnees.General.PlacesParJour**: `number`

• **loginInformations.donnees.General.Police**: `string`

• **loginInformations.donnees.General.PremierLundi**

• **loginInformations.donnees.General.PremierLundi.V**: `string`

• **loginInformations.donnees.General.PremierLundi.\_T**: `7`

• **loginInformations.donnees.General.PremiereDate**

• **loginInformations.donnees.General.PremiereDate.V**: `string`

• **loginInformations.donnees.General.PremiereDate.\_T**: `7`

• **loginInformations.donnees.General.PremiereHeure**

Pronote's Epoch (?)

• **loginInformations.donnees.General.PremiereHeure.V**: `string`

• **loginInformations.donnees.General.PremiereHeure.\_T**: `7`

• **loginInformations.donnees.General.SansValidationNivIntermediairesDsValidAuto**: `boolean`

• **loginInformations.donnees.General.TailleMaxAppreciation**: `number`[]

• **loginInformations.donnees.General.TaillePolice**: `number`

• **loginInformations.donnees.General.UrlAide**

• **loginInformations.donnees.General.UrlAide.V**: `string`

• **loginInformations.donnees.General.UrlAide.\_T**: `23`

• **loginInformations.donnees.General.activationDemiPension**: `boolean`

• **loginInformations.donnees.General.afficherSemainesCalendaires**: `0` \| `1`

• **loginInformations.donnees.General.afficherSequences**: `boolean`

• **loginInformations.donnees.General.avecForum**: `boolean`

• **loginInformations.donnees.General.couleurActiviteLangagiere**: `string`

• **loginInformations.donnees.General.dateDebutPremierCycle**

• **loginInformations.donnees.General.dateDebutPremierCycle.V**: `string`

• **loginInformations.donnees.General.dateDebutPremierCycle.\_T**: `7`

• **loginInformations.donnees.General.debutDemiPension**: `number`

• **loginInformations.donnees.General.estHebergeEnFrance**: `boolean`

• **loginInformations.donnees.General.finDemiPension**: `number`

• **loginInformations.donnees.General.genresRenduTAFValable**

• **loginInformations.donnees.General.genresRenduTAFValable.V**: `string`

• **loginInformations.donnees.General.genresRenduTAFValable.\_T**: `26`

• **loginInformations.donnees.General.grillesEDTEnCycle**: `number`

• **loginInformations.donnees.General.joursOuvresParCycle**: `number`

• **loginInformations.donnees.General.langID**: `number`

Current language ID.

• **loginInformations.donnees.General.langue**: `string`

Current language.

• **loginInformations.donnees.General.lienMentions**: `string`

• **loginInformations.donnees.General.listeAnnotationsAutorisees**

• **loginInformations.donnees.General.listeAnnotationsAutorisees.V**: `string`

• **loginInformations.donnees.General.listeAnnotationsAutorisees.\_T**: `26`

• **loginInformations.donnees.General.listeJoursFeries**

• **loginInformations.donnees.General.listeJoursFeries.V**: `object`[]

• **loginInformations.donnees.General.listeJoursFeries.\_T**: `24`

• **loginInformations.donnees.General.listeLangues**

List of available languages.

• **loginInformations.donnees.General.listeLangues.V**: `object`[]

• **loginInformations.donnees.General.listeLangues.\_T**: `24`

• **loginInformations.donnees.General.logo**

• **loginInformations.donnees.General.logo.V**: `number`

• **loginInformations.donnees.General.logo.\_T**: `25`

• **loginInformations.donnees.General.maskTelephone**: `string`

• **loginInformations.donnees.General.maxBaremeQuestionQCM**: `number`

• **loginInformations.donnees.General.maxECTS**: `number`

• **loginInformations.donnees.General.maxNbPointQCM**: `number`

• **loginInformations.donnees.General.millesime**: `string`

Year of the version.

• **loginInformations.donnees.General.minBaremeQuestionQCM**: `number`

• **loginInformations.donnees.General.nomCookieAppli**: `string`

• **loginInformations.donnees.General.numeroPremiereSemaine**: `number`

• **loginInformations.donnees.General.premierJourSemaine**: `number`

• **loginInformations.donnees.General.recreations**

• **loginInformations.donnees.General.recreations.V**: `unknown`[]

• **loginInformations.donnees.General.recreations.\_T**: `24`

• **loginInformations.donnees.General.sequences**: `string`[]

• **loginInformations.donnees.General.setOfJoursCycleOuvre**

• **loginInformations.donnees.General.setOfJoursCycleOuvre.V**: `string`

• **loginInformations.donnees.General.setOfJoursCycleOuvre.\_T**: `26`

• **loginInformations.donnees.General.tailleCommentaireDevoir**: `number`

• **loginInformations.donnees.General.tailleLibelleElementGrilleCompetence**: `number`

• **loginInformations.donnees.General.tailleMaxEnregistrementAudioRenduTAF**: `number`

• **loginInformations.donnees.General.urlAccesTwitter**

• **loginInformations.donnees.General.urlAccesTwitter.V**: `string`

• **loginInformations.donnees.General.urlAccesTwitter.\_T**: `23`

• **loginInformations.donnees.General.urlAccesVideos**

• **loginInformations.donnees.General.urlAccesVideos.V**: `string`

• **loginInformations.donnees.General.urlAccesVideos.\_T**: `23`

• **loginInformations.donnees.General.urlCanope**

• **loginInformations.donnees.General.urlCanope.V**: `string`

• **loginInformations.donnees.General.urlCanope.\_T**: `23`

• **loginInformations.donnees.General.urlFAQEnregistrementDoubleAuth**

• **loginInformations.donnees.General.urlFAQEnregistrementDoubleAuth.V**: `string`

• **loginInformations.donnees.General.urlFAQEnregistrementDoubleAuth.\_T**: `23`

• **loginInformations.donnees.General.urlSiteIndexEducation**

• **loginInformations.donnees.General.urlSiteIndexEducation.V**: `string`

• **loginInformations.donnees.General.urlSiteIndexEducation.\_T**: `23`

• **loginInformations.donnees.General.urlSiteInfosHebergement**

• **loginInformations.donnees.General.urlSiteInfosHebergement.V**: `string`

• **loginInformations.donnees.General.urlSiteInfosHebergement.\_T**: `23`

• **loginInformations.donnees.General.version**: `string`

Complete version with name of the app.

• **loginInformations.donnees.General.versionPN**: `string`

Pronote version.

• **loginInformations.donnees.Nom**: `string`

Content of the header in instance page.

• **loginInformations.donnees.Theme**: `number`

• **loginInformations.donnees.URLEspace**: `string`

Path for the same instance page but on desktop.

• **loginInformations.donnees.avecMembre**: `boolean`

• **loginInformations.donnees.genreImageConnexion**: `number`

• **loginInformations.donnees.identifiantNav**: `string`

• **loginInformations.donnees.labelLienProduit**: `string`

• **loginInformations.donnees.listePolices**

Array of available fonts... why the hell they need this ?

• **loginInformations.donnees.listePolices.V**: `object`[]

• **loginInformations.donnees.listePolices.\_T**: `24`

• **loginInformations.donnees.logoProduitCss**: `string`

• **loginInformations.donnees.mentionsPagesPubliques**

• **loginInformations.donnees.mentionsPagesPubliques.lien**

• **loginInformations.donnees.mentionsPagesPubliques.lien.V**: `string`

• **loginInformations.donnees.mentionsPagesPubliques.lien.\_T**: `21`

• **loginInformations.donnees.pourNouvelleCaledonie**: `boolean`

• **loginInformations.donnees.urlImageConnexion**: `string`

• **loginInformations.nom**: `Informations`

#### Returns

[`Pronote`](/api/classes/pronote/)

#### Source

[src/client/Pronote.ts:283](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L283)

## Instance Informations

Category about the instance informations.

### accountTypeID

> **accountTypeID**: [`PronoteApiAccountId`](/api/enumerations/pronoteapiaccountid/)

ID of this account type in the Pronote API.

#### Source

[src/client/Pronote.ts:191](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L191)

***

### isDemo

> **isDemo**: `boolean`

Whether the Pronote instance you're connected to
is a demonstration server or not.

`authenticateToken` won't work against them since
next-time tokens aren't saved, even though
it's able to generate them.

#### Source

[src/client/Pronote.ts:208](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L208)

***

### pronoteRootURL

> **pronoteRootURL**: `string`

Root URL of the Pronote instance.

#### Source

[src/client/Pronote.ts:185](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L185)

***

### schoolName

> **schoolName**: `string`

School name of the Pronote instance.

#### Source

[src/client/Pronote.ts:220](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L220)

***

### sessionID

> **sessionID**: `number`

ID of the currently running session on Pronote.

#### Source

[src/client/Pronote.ts:197](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L197)

***

### authorizations

> `get` **authorizations**(): [`Authorizations`](/api/classes/authorizations/)

View authorizations of the user in the instance.

#### Returns

[`Authorizations`](/api/classes/authorizations/)

#### Source

[src/client/Pronote.ts:134](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L134)

## Key Dates

Category about the key dates of the school year.

### firstDate

> **firstDate**: `Date`

First day of the entire school year.

#### Source

[src/client/Pronote.ts:149](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L149)

***

### firstMonday

> **firstMonday**: `Date`

First day of the entire timetable.
Used to get week numbers relative to this date.

#### Source

[src/client/Pronote.ts:142](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L142)

***

### holidays

> **holidays**: [`Holiday`](/api/classes/holiday/)[]

A list of vacation periods

#### Source

[src/client/Pronote.ts:260](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L260)

***

### lastDate

> **lastDate**: `Date`

Last day of the entire year.
Used to get week numbers relative to this date.

#### Source

[src/client/Pronote.ts:156](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L156)

***

### nextOpenDate

> **nextOpenDate**: `Date`

The next school opening day.

#### Source

[src/client/Pronote.ts:162](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L162)

## Discussions

With this category you can view and interact with discussions.

### getDiscussionsOverview()

> **getDiscussionsOverview**(): `Promise`\<[`StudentDiscussionsOverview`](/api/classes/studentdiscussionsoverview/)\>

#### Returns

`Promise`\<[`StudentDiscussionsOverview`](/api/classes/studentdiscussionsoverview/)\>

#### See

 - [manage.ts](https://github.com/LiterateInk/Pawnote/blob/main/examples/discussions/manage.ts)
 - [StudentDiscussionsOverview](../../../../api/classes/studentdiscussionsoverview) for more details.

#### Example

```ts
// First get the discussions
const discussionsOverview = await pronoteInstance.getDiscussionsOverview();
// Then interact with they.
for (discussion of discussionsOverview.discussions) {
  console.log(discussion.subject);
  condole.log("In " + discussion.folder.name + "Folder");
  if (discussion.deleted){
    console.log("The discussion is deleted !");
  } else {
    discussion.markAsRead();
    await discussion.moveToTrash()
    await discussion.restoreFromTrash();
  }  
}
```

#### Source

[src/client/Pronote.ts:791](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L791)

## Grades and Evaluations

Category about the grades and evaluations.

### getEvaluations()

> **getEvaluations**(`period`?): `Promise`\<`StudentEvaluation`[]\>

Get evaluations for a specific period.

#### Parameters

• **period?**: [`Period`](/api/classes/period/)

Period the grades overview will be from.
Default is current period.

#### Returns

`Promise`\<`StudentEvaluation`[]\>

Promise<StudentEvaluation[]>

#### Source

[src/client/Pronote.ts:634](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L634)

***

### getGradesOverview()

> **getGradesOverview**(`period`?): `Promise`\<`object`\>

Get grades overview for a specific period.
Including student's grades with averages and the global averages.

#### Parameters

• **period?**: [`Period`](/api/classes/period/)

Period the grades overview will be from.
Default is current period.

#### Returns

`Promise`\<`object`\>

##### averages

> **averages**: `StudentAverage`[]

##### classAverage

> **classAverage**: `undefined` \| `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

##### grades

> **grades**: [`StudentGrade`](/api/classes/studentgrade/)[]

##### overallAverage

> **overallAverage**: `undefined` \| `number` \| [`PronoteApiGradeType`](/api/enumerations/pronoteapigradetype/)

#### Remark

Internally used in the `Period` class.

#### Source

[src/client/Pronote.ts:585](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L585)

## Homework

Category about homeworks.

### getHomeworkForInterval()

> **getHomeworkForInterval**(`from`, `to`): `Promise`\<[`StudentHomework`](/api/classes/studenthomework/)[]\>

Return Homeworks between `from` and `to` params.

#### Parameters

• **from**: `Date`

From when date to recover Homework.

• **to**: `Date`= `undefined`

Until when to recover Homework.
Default it is the end of the scholar year using `lastDate` class property.

#### Returns

`Promise`\<[`StudentHomework`](/api/classes/studenthomework/)[]\>

#### Example

```ts
// Returns today's Homework until the end of the school year.
await pronoteInstance.getHomeworkForInterval(new Date());
// Returns today's Homework.
await pronoteInstance.getHomeworkForInterval(new Date(), new Date());
// Returns the Homework between January 1, 2024 and January 15, 2024.
await pronoteInstance.getHomeworkForInterval(new Date(2024, 1, 1), new Date(2024, 1, 15));
```

#### Source

[src/client/Pronote.ts:427](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L427)

***

### getHomeworkForWeek()

> **getHomeworkForWeek**(`weekNumber`): `Promise`\<[`StudentHomework`](/api/classes/studenthomework/)[]\>

Returns the homework for the `weekNumber` week since the start of the school year.

#### Parameters

• **weekNumber**: `number`

The number of the week we want to collect homework.

#### Returns

`Promise`\<[`StudentHomework`](/api/classes/studenthomework/)[]\>

#### Source

[src/client/Pronote.ts:457](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L457)

***

### getLessonHomework()

> **getLessonHomework**(`lessonId`): `Promise`\<[`StudentHomework`](/api/classes/studenthomework/)[]\>

Get the homework associated with the given `lessonId`.

#### Parameters

• **lessonId**: `string`

The

#### Returns

`Promise`\<[`StudentHomework`](/api/classes/studenthomework/)[]\>

#### Source

[src/client/Pronote.ts:737](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L737)

***

### patchHomeworkStatus()

> **patchHomeworkStatus**(`homeworkID`, `done`): `Promise`\<`void`\>

Set an homework as done or not.

#### Parameters

• **homeworkID**: `string`

The id of the homework to update status.

• **done**: `boolean`

Is the homework is done ?

#### Returns

`Promise`\<`void`\>

#### Source

[src/client/Pronote.ts:540](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L540)

## Methods

### createDiscussion()

> **createDiscussion**(`subject`, `content`, `recipients`): `Promise`\<`void`\>

Creates a discussion.

Sadly, we can't get the ID of the created discussion
or anything else related to it, you need to request the
discussions list once again using `getDiscussionsOverview()`.

#### Parameters

• **subject**: `string`

• **content**: `string`

• **recipients**: [`DiscussionCreationRecipient`](/api/classes/discussioncreationrecipient/)[]

#### Returns

`Promise`\<`void`\>

#### Source

[src/client/Pronote.ts:991](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L991)

***

### getAttendance()

> **getAttendance**(`period`): `Promise`\<([`StudentDelay`](/api/classes/studentdelay/) \| [`StudentPunishment`](/api/classes/studentpunishment/) \| [`StudentAbsence`](/api/classes/studentabsence/) \| [`StudentObservation`](/api/classes/studentobservation/))[]\>

#### Parameters

• **period**: [`Period`](/api/classes/period/)= `undefined`

#### Returns

`Promise`\<([`StudentDelay`](/api/classes/studentdelay/) \| [`StudentPunishment`](/api/classes/studentpunishment/) \| [`StudentAbsence`](/api/classes/studentabsence/) \| [`StudentObservation`](/api/classes/studentobservation/))[]\>

#### Source

[src/client/Pronote.ts:879](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L879)

***

### getFrequencyForWeek()

> **getFrequencyForWeek**(`weekNumber`): `null` \| `object`

#### Parameters

• **weekNumber**: `number`

#### Returns

`null` \| `object`

#### Source

[src/client/Pronote.ts:1093](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L1093)

***

### getHomePage()

> **getHomePage**(`nextOpenDate`): `Promise`\<`object`\>

#### Parameters

• **nextOpenDate**: `Date`= `undefined`

#### Returns

`Promise`\<`object`\>

##### ard

> **ard**: `null` \| [`ARDPartner`](/api/classes/ardpartner/)

#### Source

[src/client/Pronote.ts:1061](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L1061)

***

### getMessagesOverviewFromDiscussion()

> **getMessagesOverviewFromDiscussion**(`discussion`, `markAsRead`, `limit`): `Promise`\<[`MessagesOverview`](/api/classes/messagesoverview/)\>

#### Parameters

• **discussion**: [`StudentDiscussion`](/api/classes/studentdiscussion/)

• **markAsRead**: `boolean`= `false`

• **limit**: `number`= `0`

#### Returns

`Promise`\<[`MessagesOverview`](/api/classes/messagesoverview/)\>

#### Source

[src/client/Pronote.ts:800](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L800)

***

### getPartnerURL()

> **getPartnerURL**(`partner`): `Promise`\<`string`\>

#### Parameters

• **partner**: `Partner`

#### Returns

`Promise`\<`string`\>

#### Source

[src/client/Pronote.ts:1078](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L1078)

***

### getRecipientsForDiscussionCreation()

> **getRecipientsForDiscussionCreation**(`type`): `Promise`\<[`DiscussionCreationRecipient`](/api/classes/discussioncreationrecipient/)[]\>

Returns a list of possible recipients when creating a discussion.

This step is required before creating a discussion.
It allows to know who can be the recipient of the discussion.

#### Parameters

• **type**: `PronoteApiUserResourceType`

#### Returns

`Promise`\<[`DiscussionCreationRecipient`](/api/classes/discussioncreationrecipient/)[]\>

#### Source

[src/client/Pronote.ts:964](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L964)

***

### getRecipientsForMessage()

> **getRecipientsForMessage**(`messageID`): `Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

#### Parameters

• **messageID**: `string`

#### Returns

`Promise`\<[`FetchedMessageRecipient`](/api/classes/fetchedmessagerecipient/)[]\>

#### Source

[src/client/Pronote.ts:832](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L832)

***

### markDiscussionAsRead()

> **markDiscussionAsRead**(`discussion`): `Promise`\<`void`\>

Mark a discussion as read.

#### Parameters

• **discussion**: [`StudentDiscussion`](/api/classes/studentdiscussion/)

#### Returns

`Promise`\<`void`\>

#### Remark

Shortcut for `getMessagesFromDiscussion` but here we don't return anything.

#### Source

[src/client/Pronote.ts:828](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L828)

***

### patchNewsState()

> **patchNewsState**(`information`, `answers`, `extra`): `Promise`\<`undefined`\>

Updates the status of a news item.
Could be a read, or answer to a survey.

Should only be used internally, but if you know
what you're doing, you can use it.

#### Parameters

• **information**

• **information.id**: `string`

• **information.public**: `PronoteApiNewsPublicSelf`

• **information.title**: `string`

• **answers**: [`StudentNewsItemQuestion`](/api/classes/studentnewsitemquestion/)[]

• **extra**= `undefined`

• **extra.delete**: `boolean`= `false`

• **extra.markAsRead**: `boolean`= `true`

• **extra.onlyMarkAsRead**: `boolean`= `false`

#### Returns

`Promise`\<`undefined`\>

#### Source

[src/client/Pronote.ts:916](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L916)

***

### postDiscussionCommand()

> **postDiscussionCommand**(`payload`): `Promise`\<`void`\>

#### Parameters

• **payload**: `ApiUserDiscussionAvailableCommands`

#### Returns

`Promise`\<`void`\>

#### Source

[src/client/Pronote.ts:813](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L813)

***

### removeHomeworkFile()

> **removeHomeworkFile**(`homeworkID`): `Promise`\<`void`\>

#### Parameters

• **homeworkID**: `string`

#### Returns

`Promise`\<`void`\>

#### Source

[src/client/Pronote.ts:1052](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L1052)

***

### replyToDiscussionMessage()

> **replyToDiscussionMessage**(`replyMessageID`, `content`, `button`, `includeParentsAndStudents`): `Promise`\<`void`\>

#### Parameters

• **replyMessageID**: `string`

• **content**: `string`

• **button**: `PronoteApiMessagesButtonType`

• **includeParentsAndStudents**: `boolean`= `false`

#### Returns

`Promise`\<`void`\>

#### Source

[src/client/Pronote.ts:1008](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L1008)

***

### uploadHomeworkFile()

> **uploadHomeworkFile**(`homeworkID`, `file`, `fileName`): `Promise`\<`void`\>

#### Parameters

• **homeworkID**: `string`

• **file**: `PawnoteSupportedFormDataFile`

• **fileName**: `string`

#### Returns

`Promise`\<`void`\>

#### Source

[src/client/Pronote.ts:1025](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L1025)

## News

In this category, you can find methods about newq.

### getNews()

> **getNews**(): `Promise`\<[`StudentNews`](/api/classes/studentnews/)\>

Get news such like unread Communication or Discussions.

#### Returns

`Promise`\<[`StudentNews`](/api/classes/studentnews/)\>

#### Source

[src/client/Pronote.ts:754](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L754)

## Periods

This category is for everythings linked with periods.

### periods

> **periods**: [`Period`](/api/classes/period/)[]

A list of year periods.

#### Source

[src/client/Pronote.ts:242](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L242)

***

### readDefaultPeriodForAttendance()

> **readDefaultPeriodForAttendance**(): [`Period`](/api/classes/period/)

#### Returns

[`Period`](/api/classes/period/)

#### Source

[src/client/Pronote.ts:850](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L850)

***

### readDefaultPeriodForEvaluations()

> **readDefaultPeriodForEvaluations**(): [`Period`](/api/classes/period/)

Get the current evaluations period.

#### Returns

[`Period`](/api/classes/period/)

#### Source

[src/client/Pronote.ts:623](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L623)

***

### readDefaultPeriodForGradesOverview()

> **readDefaultPeriodForGradesOverview**(): [`Period`](/api/classes/period/)

Get the current grades period.

#### Returns

[`Period`](/api/classes/period/)

#### Source

[src/client/Pronote.ts:567](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L567)

***

### readPeriodsForAttendance()

> **readPeriodsForAttendance**(): [`Period`](/api/classes/period/)[]

#### Returns

[`Period`](/api/classes/period/)[]

#### Source

[src/client/Pronote.ts:859](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L859)

***

### readPeriodsForEvaluations()

> **readPeriodsForEvaluations**(): [`Period`](/api/classes/period/)[]

Get the evaluations periods.

#### Returns

[`Period`](/api/classes/period/)[]

#### Source

[src/client/Pronote.ts:613](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L613)

***

### readPeriodsForGradesOverview()

> **readPeriodsForGradesOverview**(): [`Period`](/api/classes/period/)[]

Get the grades periods.

#### Returns

[`Period`](/api/classes/period/)[]

#### Source

[src/client/Pronote.ts:557](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L557)

## Ressources

This category allows you to get resources in different ways

### getLessonResource()

> **getLessonResource**(`lessonId`): `Promise`\<`StudentLessonResource`\>

Get the ressources associated with the given `lessonId`.

#### Parameters

• **lessonId**: `string`

The

#### Returns

`Promise`\<`StudentLessonResource`\>

#### Example

```ts
// Get the timetable of tomorrow
tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
overview = await pronoteInstance.getTimetableOverview(tomorrowDate);
//
```

#### Source

[src/client/Pronote.ts:719](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L719)

***

### getResourcesForInterval()

> **getResourcesForInterval**(`from`, `to`?): `Promise`\<`object`\>

Return ressources between `from` and `to` params.

#### Parameters

• **from**: `Date`

From when date to recover Ressources.

• **to?**: `Date`

Until when to recover Ressources.
Default it is the end of the scholar year using `lastDate` class property.

#### Returns

`Promise`\<`object`\>

##### lessons

> **lessons**: `StudentLessonResource`[]

#### Example

```ts
// Returns today's Ressources until the end of the school year.
await pronoteInstance.getResourcesForInterval(new Date());
// Returns today's Ressources.
await pronoteInstance.getResourcesForInterval(new Date(), new Date());
// Returns the Ressources between January 1, 2024 and January 15, 2024.
await pronoteInstance.getResourcesForInterval(new Date(2024, 1, 1), new Date(2024, 1, 15));
```

#### Source

[src/client/Pronote.ts:503](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L503)

***

### getResourcesForWeek()

> **getResourcesForWeek**(`weekNumber`): `Promise`\<`object`\>

Returns the ressources for the `weekNumber` week since the start of the school year.

#### Parameters

• **weekNumber**: `number`

The number of the week we want to collect ressources.

#### Returns

`Promise`\<`object`\>

##### lessons

> **lessons**: `StudentLessonResource`[]

#### Source

[src/client/Pronote.ts:475](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L475)

## Timetable

This category links everything related to timetable

### getTimetableOverview()

> **getTimetableOverview**(`start`, `end`?): `Promise`\<[`TimetableOverview`](/api/classes/timetableoverview/)\>

Obtain a overview of the Timetable between the `start` and `end` arguments.

#### Parameters

• **start**: `Date`

From when date to recover Timetable.

• **end?**: `Date`

Until when to recover Timetable.

#### Returns

`Promise`\<[`TimetableOverview`](/api/classes/timetableoverview/)\>

#### See

[timetable.ts](https://github.com/LiterateInk/Pawnote/blob/main/examples/timetable.ts)

#### Example

```ts
// Returns the Timetable of today.
const overview = await pronoteInstance.getTimetableOverview(new Date());
const timetable = overview.parse({
  withSuperposedCanceledClasses: false,
  withCanceledClasses: true,
  withPlannedClasses: true
});

// Returns the Timetable of January 2, 2024.
const overview = await PronoteInstance.getTimetableOverview(new Date(2024, 1, 2));
const timetable = overview.parse({
  withSuperposedCanceledClasses: false,
  withCanceledClasses: true,
  withPlannedClasses: true
});

// Returns the Timetable between January 1, 2024 and January 15, 2024.
const overview = await PronoteInstance.getTimetableOverview(new Date(2024, 1, 1), new Date(2024, 1, 15));
const timetable = overview.parse({
  withSuperposedCanceledClasses: false,
  withCanceledClasses: true,
  withPlannedClasses: true
});
```

#### Source

[src/client/Pronote.ts:400](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L400)

## User Informations

Here you can get information about the student like name or current class.

### isDelegate

> **isDelegate**: `boolean`

Indicates if the student is a class delegate

#### Source

[src/client/Pronote.ts:249](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L249)

***

### isMemberCA

> **isMemberCA**: `boolean`

Indicates if the student is part of the board of directors

#### Source

[src/client/Pronote.ts:254](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L254)

***

### nextTimeToken

> **nextTimeToken**: `string`

Acts as a replacement for the password.
Whenever you need to authenticate, you should use this token
from now on if you want to avoid entering your password again.

Note that this token is only valid for the `deviceUUID` you provided
in the authentication options.

#### Source

[src/client/Pronote.ts:179](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L179)

***

### studentClass

> **studentClass**: `string`

The current class of the student.

#### Example

```ts
// get the current class of the student, like "3A"
currentClass = pronoteInstance.studentClass
```

#### Source

[src/client/Pronote.ts:229](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L229)

***

### studentName

> **studentName**: `string`

First name and family name of the logged in student.

#### Source

[src/client/Pronote.ts:214](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L214)

***

### studentProfilePictureURL?

> `optional` **studentProfilePictureURL**: `string`

An absolute URL giving the profile picture of the logged in student,
if exists.

#### Source

[src/client/Pronote.ts:236](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L236)

***

### username

> **username**: `string`

Username that SHOULD be used for any further authentication.

#### Source

[src/client/Pronote.ts:168](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L168)

***

### getPersonalInformation()

> **getPersonalInformation**(`forceUpdate`): `Promise`\<`StudentPersonalInformation`\>

Allows to get more information such as student's INE, email,
phone and address.

#### Parameters

• **forceUpdate**: `boolean`= `false`

Forces the API request, even if a cache for this request was made.

#### Returns

`Promise`\<`StudentPersonalInformation`\>

#### Source

[src/client/Pronote.ts:662](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L662)

## Utils

This category lists all non-essential tools

### fetcher

> **fetcher**: [`PawnoteFetcher`](/api/type-aliases/pawnotefetcher/)

Custom fetcher to call the API with another API than fetch.

#### Source

[src/client/Pronote.ts:121](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L121)

***

### loginInformations

> **loginInformations**: `object`

A lot of informations from the first login request.

#### \_Signature\_

> **\_Signature\_**: `object`

#### \_Signature\_.ModeExclusif

> **ModeExclusif**: `boolean`

#### donnees

> **donnees**: `object`

#### donnees.DateServeurHttp

> **DateServeurHttp**: `object`

Time on the server when the request was made.

#### donnees.DateServeurHttp.V

> **V**: `string`

In the following format : `DD/MM/YYYY HH:mm:ss`

#### donnees.DateServeurHttp.\_T

> **\_T**: `7`

#### donnees.General

> **General**: `object`

#### donnees.General.ActivationMessagerieEntreParents

> **ActivationMessagerieEntreParents**: `boolean`

#### donnees.General.AfficherAbbreviationNiveauDAcquisition

> **AfficherAbbreviationNiveauDAcquisition**: `boolean`

#### donnees.General.AnneeScolaire

> **AnneeScolaire**: `string`

#### donnees.General.AvecChoixConnexion

> **AvecChoixConnexion**: `boolean`

#### donnees.General.AvecElevesRattaches

> **AvecElevesRattaches**: `boolean`

#### donnees.General.AvecEvaluationHistorique

> **AvecEvaluationHistorique**: `boolean`

#### donnees.General.AvecGestionNiveauxCECRL

> **AvecGestionNiveauxCECRL**: `boolean`

#### donnees.General.AvecHeuresPleinesApresMidi

> **AvecHeuresPleinesApresMidi**: `boolean`

#### donnees.General.AvecRecuperationInfosConnexion

> **AvecRecuperationInfosConnexion**: `boolean`

#### donnees.General.BaremeNotation

> **BaremeNotation**: `object`

#### donnees.General.BaremeNotation.V

> **V**: `string`

#### donnees.General.BaremeNotation.\_T

> **\_T**: `10`

#### donnees.General.DemiJourneesOuvrees

> **DemiJourneesOuvrees**: `object`[]

#### donnees.General.DerniereDate

> **DerniereDate**: `object`

#### donnees.General.DerniereDate.V

> **V**: `string`

#### donnees.General.DerniereDate.\_T

> **\_T**: `7`

#### donnees.General.DomainesFrequences

> **DomainesFrequences**: `Record`\<`PronoteApiDomainFrequencyType`, `PronoteValue`\<`Element`, `string`\>\>

##### Example

```ts
// A value can look like this :
"[1..7,10..16,19..25,28..33,36..44]"
// Can be read in Pawnote using the internal `parseSelection()` function.
```

#### donnees.General.DureeSequence

> **DureeSequence**: `number`

#### donnees.General.GestionParcoursExcellence

> **GestionParcoursExcellence**: `boolean`

#### donnees.General.JourOuvre

> **JourOuvre**: `object`

#### donnees.General.JourOuvre.V

> **V**: `string`

#### donnees.General.JourOuvre.\_T

> **\_T**: `7`

#### donnees.General.JourOuvres

> **JourOuvres**: `object`

#### donnees.General.JourOuvres.V

> **V**: `string`

#### donnees.General.JourOuvres.\_T

> **\_T**: `11`

#### donnees.General.JoursDemiPension

> **JoursDemiPension**: `object`

#### donnees.General.JoursDemiPension.V

> **V**: `string`

#### donnees.General.JoursDemiPension.\_T

> **\_T**: `26`

#### donnees.General.LibellesFrequences

> **LibellesFrequences**: `Record`\<`PronoteApiDomainFrequencyType`, `string`\>

#### donnees.General.ListeHeures

> **ListeHeures**: `object`

#### donnees.General.ListeHeures.V

> **V**: `object`[]

#### donnees.General.ListeHeures.\_T

> **\_T**: `24`

#### donnees.General.ListeHeuresFin

> **ListeHeuresFin**: `object`

#### donnees.General.ListeHeuresFin.V

> **V**: `object`[]

#### donnees.General.ListeHeuresFin.\_T

> **\_T**: `24`

#### donnees.General.ListeNiveauxDAcquisitions

> **ListeNiveauxDAcquisitions**: `object`

#### donnees.General.ListeNiveauxDAcquisitions.V

> **V**: `object`[]

#### donnees.General.ListeNiveauxDAcquisitions.\_T

> **\_T**: `24`

#### donnees.General.ListePeriodes

> **ListePeriodes**: `object`[]

#### donnees.General.NeComptabiliserQueEvalsAnneeScoDsValidAuto

> **NeComptabiliserQueEvalsAnneeScoDsValidAuto**: `boolean`

#### donnees.General.NomEtablissement

> **NomEtablissement**: `string`

#### donnees.General.NomEtablissementConnexion

> **NomEtablissementConnexion**: `string`

#### donnees.General.PlaceDemiJourneeAbsence

> **PlaceDemiJourneeAbsence**: `number`

#### donnees.General.PlacesParHeure

> **PlacesParHeure**: `number`

#### donnees.General.PlacesParJour

> **PlacesParJour**: `number`

#### donnees.General.Police

> **Police**: `string`

#### donnees.General.PremierLundi

> **PremierLundi**: `object`

#### donnees.General.PremierLundi.V

> **V**: `string`

#### donnees.General.PremierLundi.\_T

> **\_T**: `7`

#### donnees.General.PremiereDate

> **PremiereDate**: `object`

#### donnees.General.PremiereDate.V

> **V**: `string`

#### donnees.General.PremiereDate.\_T

> **\_T**: `7`

#### donnees.General.PremiereHeure

> **PremiereHeure**: `object`

Pronote's Epoch (?)

#### donnees.General.PremiereHeure.V

> **V**: `string`

#### donnees.General.PremiereHeure.\_T

> **\_T**: `7`

#### donnees.General.SansValidationNivIntermediairesDsValidAuto

> **SansValidationNivIntermediairesDsValidAuto**: `boolean`

#### donnees.General.TailleMaxAppreciation

> **TailleMaxAppreciation**: `number`[]

#### donnees.General.TaillePolice

> **TaillePolice**: `number`

#### donnees.General.UrlAide

> **UrlAide**: `object`

#### donnees.General.UrlAide.V

> **V**: `string`

#### donnees.General.UrlAide.\_T

> **\_T**: `23`

#### donnees.General.activationDemiPension

> **activationDemiPension**: `boolean`

#### donnees.General.afficherSemainesCalendaires

> **afficherSemainesCalendaires**: `0` \| `1`

#### donnees.General.afficherSequences

> **afficherSequences**: `boolean`

#### donnees.General.avecForum

> **avecForum**: `boolean`

#### donnees.General.couleurActiviteLangagiere

> **couleurActiviteLangagiere**: `string`

#### donnees.General.dateDebutPremierCycle

> **dateDebutPremierCycle**: `object`

#### donnees.General.dateDebutPremierCycle.V

> **V**: `string`

#### donnees.General.dateDebutPremierCycle.\_T

> **\_T**: `7`

#### donnees.General.debutDemiPension

> **debutDemiPension**: `number`

#### donnees.General.estHebergeEnFrance

> **estHebergeEnFrance**: `boolean`

#### donnees.General.finDemiPension

> **finDemiPension**: `number`

#### donnees.General.genresRenduTAFValable

> **genresRenduTAFValable**: `object`

#### donnees.General.genresRenduTAFValable.V

> **V**: `string`

#### donnees.General.genresRenduTAFValable.\_T

> **\_T**: `26`

#### donnees.General.grillesEDTEnCycle

> **grillesEDTEnCycle**: `number`

#### donnees.General.joursOuvresParCycle

> **joursOuvresParCycle**: `number`

#### donnees.General.langID

> **langID**: `number`

Current language ID.

#### donnees.General.langue

> **langue**: `string`

Current language.

#### donnees.General.lienMentions

> **lienMentions**: `string`

#### donnees.General.listeAnnotationsAutorisees

> **listeAnnotationsAutorisees**: `object`

#### donnees.General.listeAnnotationsAutorisees.V

> **V**: `string`

#### donnees.General.listeAnnotationsAutorisees.\_T

> **\_T**: `26`

#### donnees.General.listeJoursFeries

> **listeJoursFeries**: `object`

#### donnees.General.listeJoursFeries.V

> **V**: `object`[]

#### donnees.General.listeJoursFeries.\_T

> **\_T**: `24`

#### donnees.General.listeLangues

> **listeLangues**: `object`

List of available languages.

#### donnees.General.listeLangues.V

> **V**: `object`[]

#### donnees.General.listeLangues.\_T

> **\_T**: `24`

#### donnees.General.logo

> **logo**: `object`

#### donnees.General.logo.V

> **V**: `number`

#### donnees.General.logo.\_T

> **\_T**: `25`

#### donnees.General.maskTelephone

> **maskTelephone**: `string`

#### donnees.General.maxBaremeQuestionQCM

> **maxBaremeQuestionQCM**: `number`

#### donnees.General.maxECTS

> **maxECTS**: `number`

#### donnees.General.maxNbPointQCM

> **maxNbPointQCM**: `number`

#### donnees.General.millesime

> **millesime**: `string`

Year of the version.

#### donnees.General.minBaremeQuestionQCM

> **minBaremeQuestionQCM**: `number`

#### donnees.General.nomCookieAppli

> **nomCookieAppli**: `string`

#### donnees.General.numeroPremiereSemaine

> **numeroPremiereSemaine**: `number`

#### donnees.General.premierJourSemaine

> **premierJourSemaine**: `number`

#### donnees.General.recreations

> **recreations**: `object`

#### donnees.General.recreations.V

> **V**: `unknown`[]

#### donnees.General.recreations.\_T

> **\_T**: `24`

#### donnees.General.sequences

> **sequences**: `string`[]

#### donnees.General.setOfJoursCycleOuvre

> **setOfJoursCycleOuvre**: `object`

#### donnees.General.setOfJoursCycleOuvre.V

> **V**: `string`

#### donnees.General.setOfJoursCycleOuvre.\_T

> **\_T**: `26`

#### donnees.General.tailleCommentaireDevoir

> **tailleCommentaireDevoir**: `number`

#### donnees.General.tailleLibelleElementGrilleCompetence

> **tailleLibelleElementGrilleCompetence**: `number`

#### donnees.General.tailleMaxEnregistrementAudioRenduTAF

> **tailleMaxEnregistrementAudioRenduTAF**: `number`

#### donnees.General.urlAccesTwitter

> **urlAccesTwitter**: `object`

#### donnees.General.urlAccesTwitter.V

> **V**: `string`

#### donnees.General.urlAccesTwitter.\_T

> **\_T**: `23`

#### donnees.General.urlAccesVideos

> **urlAccesVideos**: `object`

#### donnees.General.urlAccesVideos.V

> **V**: `string`

#### donnees.General.urlAccesVideos.\_T

> **\_T**: `23`

#### donnees.General.urlCanope

> **urlCanope**: `object`

#### donnees.General.urlCanope.V

> **V**: `string`

#### donnees.General.urlCanope.\_T

> **\_T**: `23`

#### donnees.General.urlFAQEnregistrementDoubleAuth

> **urlFAQEnregistrementDoubleAuth**: `object`

#### donnees.General.urlFAQEnregistrementDoubleAuth.V

> **V**: `string`

#### donnees.General.urlFAQEnregistrementDoubleAuth.\_T

> **\_T**: `23`

#### donnees.General.urlSiteIndexEducation

> **urlSiteIndexEducation**: `object`

#### donnees.General.urlSiteIndexEducation.V

> **V**: `string`

#### donnees.General.urlSiteIndexEducation.\_T

> **\_T**: `23`

#### donnees.General.urlSiteInfosHebergement

> **urlSiteInfosHebergement**: `object`

#### donnees.General.urlSiteInfosHebergement.V

> **V**: `string`

#### donnees.General.urlSiteInfosHebergement.\_T

> **\_T**: `23`

#### donnees.General.version

> **version**: `string`

Complete version with name of the app.

#### donnees.General.versionPN

> **versionPN**: `string`

Pronote version.

#### donnees.Nom

> **Nom**: `string`

Content of the header in instance page.

#### donnees.Theme

> **Theme**: `number`

#### donnees.URLEspace

> **URLEspace**: `string`

Path for the same instance page but on desktop.

#### donnees.avecMembre

> **avecMembre**: `boolean`

#### donnees.genreImageConnexion

> **genreImageConnexion**: `number`

#### donnees.identifiantNav

> **identifiantNav**: `string`

#### donnees.labelLienProduit

> **labelLienProduit**: `string`

#### donnees.listePolices

> **listePolices**: `object`

Array of available fonts... why the hell they need this ?

#### donnees.listePolices.V

> **V**: `object`[]

#### donnees.listePolices.\_T

> **\_T**: `24`

#### donnees.logoProduitCss

> **logoProduitCss**: `string`

#### donnees.mentionsPagesPubliques

> **mentionsPagesPubliques**: `object`

#### donnees.mentionsPagesPubliques.lien

> **lien**: `object`

#### donnees.mentionsPagesPubliques.lien.V

> **V**: `string`

#### donnees.mentionsPagesPubliques.lien.\_T

> **\_T**: `21`

#### donnees.pourNouvelleCaledonie

> **pourNouvelleCaledonie**: `boolean`

#### donnees.urlImageConnexion

> **urlImageConnexion**: `string`

#### nom

> **nom**: `Informations`

#### Source

[src/client/Pronote.ts:127](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L127)

***

### startPresenceRequests()

> **startPresenceRequests**(`interval`?): `void`

Start sending periodic presence request.

#### Parameters

• **interval?**: `number`

Custom interval (in ms) for `Presence` requests.
Defaults to 2 minutes: same value as from Pronote.

#### Returns

`void`

#### Source

[src/client/Pronote.ts:688](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L688)

***

### stopPresenceRequests()

> **stopPresenceRequests**(): `void`

Stop sending periodic presence request.

#### Returns

`void`

#### Source

[src/client/Pronote.ts:703](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L703)

## Not for normal uses

This is a category for properties and methods exposed but normaly not used.

### getAESEncryptionKeys()

> **getAESEncryptionKeys**(): `object`

You shouldn't have to use this usually,
but it's exported here in case of need
to do some operations required.

#### Returns

`object`

##### aes\_iv

> **aes\_iv**: `ByteStringBuffer`

##### aes\_key

> **aes\_key**: `ByteStringBuffer`

#### Source

[src/client/Pronote.ts:364](https://github.com/Gabriel29306/Pawnote/blob/a2552cd7208db339c299a04178513054cceb5849/src/client/Pronote.ts#L364)
