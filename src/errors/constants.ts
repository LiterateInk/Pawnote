export enum PawnoteErrorCodes {
  NetworkFail
}

export class PawnoteError extends Error {
  constructor (message: string, public code: PawnoteErrorCodes) {
    super(message);
  }
}
