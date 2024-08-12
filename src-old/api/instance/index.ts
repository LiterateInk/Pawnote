import { makeApiHandler } from "~/utils/api";
import type { PronoteApiInstance, ApiInstance } from "./types";
import { cleanPronoteUrl } from "~/pronote/url";
import { PRONOTE_ACCOUNT_TYPES, PronoteApiAccountType } from "~/constants/accounts";
import { PRONOTE_INSTANCE_MOBILE_INFOS_PATH } from "~/constants/urls";

/**
 * Filter function to prevent TS issues.
 * Allows to check that every item is defined and make them typed to `PronoteApiAccountType`.
 */
const isPronoteApiAccountType = (item: PronoteApiAccountType | undefined): item is PronoteApiAccountType => {
  return Boolean(item);
};

/**
 * Takes an instance URL and return informations about it such as...
 * - available account types ;
 * - instance name ;
 * - base URL and potential ENT URL
 */
export const callApiInstance = makeApiHandler<ApiInstance>(async (fetcher, input) => {
  const pronoteURL = cleanPronoteUrl(input.pronoteURL);
  const informationURL = `${pronoteURL}/${PRONOTE_INSTANCE_MOBILE_INFOS_PATH}`;

  const response = await fetcher(informationURL, {
    method: "GET"
  });

  // Build the local date to get the timezone offset, right after.
  // const local_date = new Date(new Date().toLocaleString("fr-FR", { timeZone: req.body.timezone }));

  const data = await response.json<PronoteApiInstance["response"]>();

  // Calculate the timezone offset between the server and the client.
  // const timezone_offset = local_date.getTime() - new Date(data.date).getTime();

  // Filter the accounts to only keep the ones that are supported.
  const accounts = data.espaces.map((account) => PRONOTE_ACCOUNT_TYPES.find(
    (account_type) => account_type.path === account.URL
  )).filter(isPronoteApiAccountType);

  return {
    accounts,
    pronoteRootURL: pronoteURL,
    version: data.version,
    schoolName: data.nomEtab,
    entURL: data.CAS.actif ? data.CAS.casURL : undefined,
    entToken: data.CAS.actif ? data.CAS.jetonCAS : undefined
  };
});
