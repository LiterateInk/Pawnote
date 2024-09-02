package models.errors

class UnreachableError(fn: String): Exception("Unreachable code reached in '${fn}' function, please open an issue on GitHub (LiterateInk/Pawnote)")