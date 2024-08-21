export type NewsCategory = Readonly<{
  id: string;
  name: string;
  /**
   * Whether this category is the default selected in the UI.
   */
  default: boolean;
}>;
