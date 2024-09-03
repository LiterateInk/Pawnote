import { decodeDomain } from "./domain";
import { decodePasswordRules } from "./password-rules";
import { DoubleAuthClientAction, type DoubleAuthMode, type SecurityModal } from "~/models";

const DOUBLE_AUTH_POSSIBILITIES = [
  DoubleAuthClientAction.AIHMSC_ChoixStrategie,
  DoubleAuthClientAction.AIHMSC_SaisieCodePINetSource,
  DoubleAuthClientAction.AIHMSC_SaisieSourcePourNotifSeulement
] as DoubleAuthClientAction[];

export const decodeSecurityModal = (authentication: any, identity: any, initialUsername?: string): SecurityModal => {
  const actions = decodeDomain(authentication.actionsDoubleAuth.V) as DoubleAuthClientAction[];

  return {
    availableSecurityModes: decodeDomain(authentication.modesPossibles.V) as DoubleAuthMode[],
    defaultSecurityMode: authentication.modeSecurisationParDefaut,
    passwordRules: decodePasswordRules(authentication.reglesSaisieMDP),
    shouldCustomPassword: actions.includes(DoubleAuthClientAction.AIHMSC_PersonnalisationMotDePasse),
    shouldCustomDoubleAuth: actions.some((action) => DOUBLE_AUTH_POSSIBILITIES.includes(action)),

    context: {
      authentication,
      identity,
      initialUsername
    }
  };
};
