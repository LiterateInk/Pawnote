import { decodeDomain } from "./domain";
import { decodePasswordRules } from "./password-rules";
import { DoubleAuthClientAction, type DoubleAuthMode, type SecurityModal } from "~/models";

export const decodeSecurityModal = (authentication: any, identity: any, initialUsername?: string): SecurityModal => {
  const actions = decodeDomain(authentication.actionsDoubleAuth.V) as DoubleAuthClientAction[];

  return {
    availableSecurityModes: decodeDomain(authentication.modesPossibles.V) as DoubleAuthMode[],
    defaultSecurityMode: authentication.modeSecurisationParDefaut,
    passwordRules: decodePasswordRules(authentication.reglesSaisieMDP),

    shouldCustomPassword: actions.includes(DoubleAuthClientAction.AIHMSC_PersonnalisationMotDePasse),
    shouldCustomDoubleAuth: actions.includes(DoubleAuthClientAction.AIHMSC_ChoixStrategie),

    shouldEnterPIN: actions.includes(DoubleAuthClientAction.AIHMSC_SaisieCodePINetSource),
    shouldEnterSource: actions.includes(DoubleAuthClientAction.AIHMSC_SaisieSourcePourNotifSeulement),

    context: {
      authentication,
      identity,
      initialUsername
    }
  };
};
