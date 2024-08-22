import { RequestFN } from "~/core/request-function";
import { decodeDiscussion } from "~/decoders/discussion";
import { decodeDiscussionFolder } from "~/decoders/discussion-folder";
import { Discussion, Discussions, TabLocation, type SessionHandle } from "~/models";

/**
 * We use an handle to keep data in sync
 * when a new discussion or message is created etc...
 */
export const discussions = async (session: SessionHandle, cache: Record<string, Discussion> = {}): Promise<Discussions> => {
  const request = new RequestFN(session, "ListeMessagerie", {
    _Signature_: { onglet: TabLocation.Discussions },

    donnees: {
      avecLu: true,
      avecMessage: true,
      possessionMessageDiscussionUnique: null
    }
  });

  const response = await request.send();
  const data = response.data.donnees;

  const folders = data.listeEtiquettes.V.map(decodeDiscussionFolder);

  const items: Discussion[] = data.listeMessagerie.V
    .filter((discussion: any) => {
      const hasZeroDepth = (discussion.profondeur || 0) === 0;
      const hasParticipants = discussion.messagePourParticipants?.V.N;
      return discussion.estUneDiscussion && hasParticipants && hasZeroDepth;
    })
    .map((discussion: any) => decodeDiscussion(discussion, folders, cache));

  for (const item of items) { // set up our handle cache !
    if (item.participantsMessageID in cache) {
      // update the reference directly
      Object.assign(cache[item.participantsMessageID], item);
    }
    else {
      // setup the reference
      cache[item.participantsMessageID] = item;
    }
  }

  // TODO: remove outdated keys

  return {
    folders,
    items
  };
};
