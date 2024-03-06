import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserResourceType } from "~/constants/users";
import type { Session } from "~/session";

export interface PronoteApiUserCreateDiscussionRecipients {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      filtreElement: {
        N: string
        L: string
        G: PronoteApiUserResourceType
      }

      onglet: {
        N: 0
        G: PronoteApiUserResourceType
      }
    }
  }

  response: {
    donnees: {
      listeRessourcesPourCommunication: PronoteValue<24, Array<{
        L: string
        N: string
        P: number
        G: PronoteApiUserResourceType

        /**
         * Whether this user can discuss with the current user.
         */
        avecDiscussion?: boolean

        /**
         * Whether this user is the "Professeur Principal"
         */
        estPrincipal?: boolean

        listeRessources: PronoteValue<24, Array<{
          L: string
          N: string
          estUneSousMatiere?: boolean
        } & {
          estUneSousMatiere: true
          libelleMatiere: string
        }>>
      }>>
    }
    nom: PronoteApiFunctions.CreateDiscussionRecipients
  }
}

export interface ApiUserCreateDiscussionRecipients {
  input: {
    session: Session
    recipientType: PronoteApiUserResourceType

    user: {
      type: PronoteApiUserResourceType
      name: string
      id: string
    }
  }

  output: {
    data: PronoteApiUserCreateDiscussionRecipients["response"]
  }
}
