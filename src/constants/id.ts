/**
 * Defaults to `-1000`, used to generate IDs for newly created objects.
 * Whenever an object is created using this ID, it should be decremented by `1`.
 */
let creationID = -1000;
export const generateCreationID = (): number => {
  creationID -= 1;
  return creationID;
};

/**
 * An ID starting with a given number, followed by a `#` and a string.
 */
export type PronoteApiID<Type extends number> = `${Type}#${string}`;
