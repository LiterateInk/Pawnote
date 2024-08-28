export class UnreachableError extends Error {
  constructor(fn: string) {
    super(`Unreachable code reached in '${fn}' function, please open an issue on GitHub (LiterateInk/Pawnote)`);
    this.name = "UnreachableError";
  }
}
