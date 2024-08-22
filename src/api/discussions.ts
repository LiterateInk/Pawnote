import { RequestFN } from "~/core/request-function";
import { decodeDiscussion } from "~/decoders/discussion";
import { decodeDiscussionFolder } from "~/decoders/discussion-folder";
import { type Discussion, type Discussions, TabLocation, type SessionHandle } from "~/models";

export const discussions = async (session: SessionHandle, cache: Record<string, any> = {}): Promise<Discussions> => {
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

  // This allows us to mutate the reference directly
  // and make sure all the variables using the cache
  // are updated.
  let itemsReference: Discussion[] = cache["__"];

  if (itemsReference) {
    // This is a trick to keep the reference to the items
    // in the cache, while updating the items.
    itemsReference.length = 0;
    itemsReference.push(...items);
  }
  else {
    itemsReference = cache["__"] = items;
  }

  for (const item of itemsReference) {
    if (item.participantsMessageID in cache) {
      // Mutate the reference directly in cache.
      Object.assign(cache[item.participantsMessageID], item);
    }
    else {
      // Create the reference in cache.
      cache[item.participantsMessageID] = item;
    }
  }

  // Delete outdated keys, in case there are any.
  for (const key in cache) {
    if (!itemsReference.find((item) => item.participantsMessageID === key)) {
      delete cache[key];
    }
  }

  return {
    folders,
    // Instead of returning the items, we return
    // the reference to the items in the cache.
    items: itemsReference
  };
};
