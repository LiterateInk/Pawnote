import { PronoteApiFunctions } from "../../../constants/functions";
import { PronoteApiOnglets } from "../../../constants/onglets";
import { Session } from "../../../session";

export interface PronoteApiUserHomeworkStatus {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Homework
    }

    donnees: {
      listeTAF: Array<{
        /** ID of the homework to update. */
        N: string

        /** Value of the new status. */
        TAFFait: boolean
      }>
    }
  }

  response: {
    nom: PronoteApiFunctions.HomeworkDone
    RapportSaisie: Record<string, never>
    donnees: Record<string, never>
  }
}

export interface ApiUserHomeworkStatus {
  input: {
    /**
     * - `true` when the homework is done ;
     * - `false` when it's not.
     */
    status: boolean
    id: string

    session: Session
  }

  output: {
    data: PronoteApiUserHomeworkStatus["response"]
  }
}
