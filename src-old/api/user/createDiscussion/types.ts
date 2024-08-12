import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiResourceType } from "~/constants/resources";
import type { DiscussionCreationRecipient } from "~/parser/recipient";
import type { Session } from "~/session";

export interface PronoteApiUserCreateDiscussion {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      /**
       * NOTE: Not sure what this is.
       *
       * Always defaulted to `false` in my testing student account.
       * Probably a property for teachers or staff ?
       */
      estCreationCarnetLiaison: boolean

      /** Subject of the discussion. */
      objet: string

      /**
       * Content (could be HTML or plain text)
       * of the first message.
       *
       * @remark Students can't send HTML, they'll always have to stick with plain text.
       */
      contenu: string | PronoteValue<21, string>

      /**
       * TODO: Type this.
       *
       * @remark Only available when full customization of the content is available,
       * so not for students.
       */
      listeFichiers?: unknown[]

      listeDestinataires: Array<{
        N: string
        G: PronoteApiResourceType

        /**
         * NOTE: Not sure if this is a constant or if it depends on something else.
         *
         * It always defaulted to `2` for me...
         */
        E: 2
      }>
    }
  }

  response: {
    donnees: {}
    RapportSaisie: {
      messageToast: string
      estCreationDiscussion: true
    }

    nom: PronoteApiFunctions.Discussions
  }
}

export interface ApiUserCreateDiscussion {
  input: {
    session: Session
    subject: string
    content: { isHTML: boolean, value: string }
    recipients: Array<DiscussionCreationRecipient>
  }

  output: PronoteApiUserCreateDiscussion["response"]
}
