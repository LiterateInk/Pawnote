/**
 * @example
 * console.log(encodeDomain([1, 3, 4, 6])); // "[1,3..4,6]"
 * console.log(encodeDomain([1, 3, 6])); // "[1,3,6]"
 * console.log(encodeDomain([1, 2, 3, 4, 5, 6])); // "[1..6]"
 */
export const encodeDomain = (numbers: number[]): string => {
  if (numbers.length === 0) return "[]";
  const sorted = [...numbers].sort((a, b) => a - b); // Make a copy to prevent mutation of original.
  const output: string[] = [];
  let last = sorted[0];
  let start = last;

  for (let index = 1; index < sorted.length; index++) {
    if (sorted[index] - last !== 1) {
      if (start === last) output.push(start.toString());
      else output.push(`${start}..${last}`);
      start = sorted[index];
    }

    last = sorted[index];
  }

  if (start === last) output.push(start.toString());
  else output.push(`${start}..${last}`);

  return `[${output.join(",")}]`;
};
