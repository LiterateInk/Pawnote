package ink.literate.pawnote.models

data class Skill(
    val id: String,

    /**
     * Order the skill should be shown. For example, if this value is `2`, then it should be shown
     * as the second skill on the evaluation skills table.
     */
    val order: Int,
    val level: String,
    val abbreviation: String,

    /** Apparently there's a coefficient on skills... not sure how it's calculated though. */
    val coefficient: Int,

    /** ID of the domain tree containing that skill. */
    val domainID: String,
    /**
     * ID of the domain tree containing that skill.
     *
     * @example "Écouter et comprendre"
     */
    val domainName: String,

    /** ID of the skill's item. */
    val itemID: String? = null,
    /**
     * Name of the skill's item.
     *
     * @example "Se familiariser aux réalités sonores de la langue, et s’entraîner à la
     *   mémorisation."
     */
    val itemName: String? = null,

    /** Skill's pillar. This is linked to the student's level. */
    val pillarID: String,
    /** @example "LANGUES VIVANTES (ÉTRANGÈRES OU RÉGIONALES)" */
    val pillarName: String,
    /** @example ["D1.2", "D2"] */
    val pillarPrefixes: List<String>
)
