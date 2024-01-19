import { PawnoteError, PawnoteErrorCodes } from "./constants";

export class PawnoteNetworkFail extends PawnoteError {
  constructor () {
    super(
      `PawnoteNetworkFail: A network error happened, you're maybe offline ?`,
      PawnoteErrorCodes.NetworkFail
    );
  }
}
