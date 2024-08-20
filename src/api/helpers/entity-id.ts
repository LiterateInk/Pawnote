/**
 * Defaults to `-1000`, used to generate IDs for newly created objects.
 * Whenever an object is created using this ID, it should be decremented by `1`.
 */
let id = -1000;

export const createEntityID = (): number => {
  id -= 1;
  return id;
};
