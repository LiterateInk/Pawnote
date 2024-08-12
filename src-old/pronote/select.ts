/**
 * Parse a selection string.
 * @example
 * const V1 = "[1,3..4,6]";
 * const V2 = "[1,3,6]";
 * const V3 = "[1..6]";
 *
 * console.log(parseSelection(V1)); // [1, 3, 4, 6]
 * console.log(parseSelection(V2)); // [1, 3, 6]
 * console.log(parseSelection(V3)); // [1, 2, 3, 4, 5, 6]
 */
export const parseSelection = (selection: string): number[] => {
  if (selection[0] !== "[" || selection[selection.length - 1] !== "]") return [];
  selection = selection.slice(1, -1);
  const output: number[] = [];

  for (const part of selection.split(",")) {
    if (part.includes("..")) {
      const [start, end] = part.split("..").map((n) => parseInt(n, 10));
      for (let i = start; i <= end; i++) output.push(i);
    }
    else output.push(parseInt(part));
  }

  return output;
};

/**
 * Create a selection string from an array of numbers.
 * @example
 * console.log(createSelectionFrom([1, 3, 4, 6])); // "[1,3..4,6]"
 * console.log(createSelectionFrom([1, 3, 6])); // "[1,3,6]"
 * console.log(createSelectionFrom([1, 2, 3, 4, 5, 6])); // "[1..6]"
 */
export const createSelectionFrom = (numbers: number[]): string => {
  if (numbers.length === 0) return "[]";
  const sorted = [...numbers].sort((a, b) => a - b); // Make a copy to prevent mutation of original.
  const output: string[] = [];
  let last = sorted[0];
  let start = last;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] - last !== 1) {
      if (start === last) output.push(start.toString());
      else output.push(`${start}..${last}`);
      start = sorted[i];
    }

    last = sorted[i];
  }

  if (start === last) output.push(start.toString());
  else output.push(`${start}..${last}`);

  return `[${output.join(",")}]`;
};
