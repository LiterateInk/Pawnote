import { RequestFN } from "~/core/request-function";
import { decodeNewDiscussionRecipient } from "~/decoders/new-discussion-recipient";
import { SessionHandle, TabLocation, UserResource, EntityKind } from "~/models";
import { NewDiscussionRecipient } from "~/models/new-discussion-recipient";

/**
 * Returns a list of possible recipients when creating a discussion.
 *
 * This step is required before creating a discussion.
 * It allows to know who can be the recipient of the discussion.
 *
 * @param kind The kind of entity to create a discussion with. Only `Teacher`, `Student` and `Personal` are allowed.
 */
export const newDiscussionRecipients = async (session: SessionHandle, user: UserResource, kind: EntityKind): Promise<Array<NewDiscussionRecipient>> => {
  // TODO: use `ListePublics` for teachers.
  const request = new RequestFN(session, "ListeRessourcesPourCommunication", {
    _Signature_: { onglet: TabLocation.Discussions },

    donnees: {
      filtreElement: {
        G: user.kind,
        L: user.name,
        N: user.id
      },

      onglet: {
        N: 0,
        G: kind
      }
    }
  });

  const response = await request.send();
  return response.data.donnees.listeRessourcesPourCommunication.V
    .filter((recipient: any) => recipient.avecDiscussion)
    .map(decodeNewDiscussionRecipient);
};
