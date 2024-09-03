/**
 * @example
 * const V1 = "[1,3..4,6]";
 * const V2 = "[1,3,6]";
 * const V3 = "[1..6]";
 *
 * console.log(decodeDomain(V1)); // [1, 3, 4, 6]
 * console.log(decodeDomain(V2)); // [1, 3, 6]
 * console.log(decodeDomain(V3)); // [1, 2, 3, 4, 5, 6]
 */
export const decodeDomain = (api: string): number[] => {
  api = api.trim();
  if (api[0] !== "[" || api[api.length - 1] !== "]") return [];

  api = api.slice(1, -1);
  if (api.length === 0) return [];

  const output: number[] = [];

  for (const part of api.split(",")) {
    if (part.includes("..")) {
      const [start, end] = part.split("..").map((n) => parseInt(n));
      for (let index = start; index <= end; index++) output.push(index);
    }
    else output.push(parseInt(part));
  }

  return output;
};
