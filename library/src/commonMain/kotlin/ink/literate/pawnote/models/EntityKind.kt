package ink.literate.pawnote.models

enum class EntityKind(val code: Int) {
    Aucune(0),
    Classe(1),
    Group(2),
    Teacher(3),
    Student(4),
    Responsable(5),
    Niveau(6),
    Orientation(7),
    Specialite(8),
    OptionSpecialite(9),
    Etablissement(10),
    Period(11),
    Service(12),
    Absence(13),
    Delay(14),
    Exclusion(15),
    Subject(16),
    Room(17),
    CoEnseignant(18),
    Suivis(19),
    Cours(20),
    Infirmerie(21),
    AbsenceRepas(22),
    Pilier(23),
    ElementPilier(24),
    Competence(25),
    _DisciplineBrevet(26),
    Palier(27),
    SousItem(28),
    Evaluation(29),
    Stage(30),
    SousMatiere(31),
    MaitreDeStage(32),
    InspecteurPedagogique(33),
    Personal(34),
    EvaluationHistorique(35),
    DossierProgression(36),
    ContenuDeCours(37),
    TravailAFaire(38),
    Progression(39),
    Dispense(40),
    Punishment(41),
    Sanction(42),
    Communication(43),
    AbsenceInternat(44),
    Observation(45),
    ObservationProfesseurEleve(46),
    ConvocationVS(47),
    DocumentJoint(48),
    InternetCategorie(49),
    DocJointEtablissement(50),
    Option(51),
    ProgrammationPunition(52),
    ReportPunition(53),
    DisciplineLivretScolaire(54),
    QCM(55),
    ExecutionQCM(56),
    QCMEditeur(57),
    PartieDeClasse(58),
    DocJointEleve(59),
    Devoir(60),
    InternetEnumere(61),
    AppreciationBulletinCompetence(62),
    Entreprise(63),
    DomaineProfessionnel(64),
    OffreDeStage(65),
    SujetDeStage(66),
    DocumentCasier(67),
    Message(68),
    PossessionMessage(69),
    RelationMessageDocJointEtablissement(70),
    Engagement(71),
    PrecautionaryMeasure(72),
    SousCategorieObjetDossier(73),
    Incident(74),
    ProtagonisteIncident(75),
    RelationIncidentFichierExterne(76),
    RegimeEleve(77),
    RepasAPreparer(78),
    SessionDeStage(79),
    Materiel(80),
    Bourse(81),
    RelationTravailAFaireEleve(82),
    LieuDossier(83),
    ElementProgramme(84),
    ChapitreEltPgm(85),
    EltPgmTravailleCDT(86),
    Appreciation(87),
    ExecutionDevoirKiosque(88),
    PanierRessourceKiosque(89),
    RessourceNumeriqueKiosque(90),
    MetaMatiere(91),
    EvaluationSujet(92),
    EvaluationCorrige(93),
    LibelleCours(94),
    Site(95),
    QuestionQCM(96),
    RelationElevePilierDeCompetence(97),
    QuestionCopieQCM(98),
    Coordonnees(99),
    ResponsablePostulant(100),
    ExecutionQCMEleve(101),
    DocJointInscription(102),
    CategorieDossier(103),
    MEFGEP(104),
    AutreOrientation(105),
    Commission(106),
    ReponseEducative(107),
    SuiviReponseEducative(108),
    NatureDocumentEleve(109);

    companion object {
        fun fromInt (code: Int) = entries.first { it.code == code }
    }
}