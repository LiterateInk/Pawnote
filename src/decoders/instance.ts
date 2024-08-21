import type { Instance } from "~/models";

export const decodeInstance = (instance: any): Instance => {
  let casURL: string | undefined;
  let casToken: string | undefined;

  if (instance.CAS.actif) {
    casURL = instance.CAS.casURL;
    casToken = instance.CAS.jetonCAS;
  }

  return {
    name: instance.nomEtab,
    version: instance.version,
    date: new Date(instance.date),
    accounts: instance.espaces.map((account: any) => ({
      name: account.nom,
      path: account.URL
    })),

    casURL, casToken
  };
};
