export type Skill = Readonly<{
  id: string;

  /**
   * Order the skill should be shown.
   * For example, if this value is `2`, then it should be shown
   * as the second skill on the evaluation skills table.
   */
  order: number;

  /** @example "Très bonne maîtrise" */
  level: string;
  /** @example "A+" */
  abbreviation: string;

  /** Apparently there's a coefficient on skills... not sure how it's calculated though. */
  coefficient: number;

  /**
   * ID of the domain tree containing that skill.
   */
  domainID: string
  /**
   * ID of the domain tree containing that skill.
   * @example "Écouter et comprendre"
   */
  domainName: string

  /**
   * ID of the skill's item.
   */
  itemID?: string
  /**
   * Name of the skill's item.
   * @example "Se familiariser aux réalités sonores de la langue, et s’entraîner à la mémorisation."
   */
  itemName?: string

  /**
   * Skill's pillar.
   * This is linked to the student's level.
   */
  pillarID: string
  /**
   * @example "LANGUES VIVANTES (ÉTRANGÈRES OU RÉGIONALES)"
   */
  pillarName: string
  /**
   * @example ["D1.2", "D2"]
   */
  pillarPrefixes: Array<string>
}>;
