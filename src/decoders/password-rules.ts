import type { PasswordRules } from "~/models";
import { decodeDomain } from "./domain";

export const decodePasswordRules = (rules: any): PasswordRules => {
  return {
    maxLength: rules.max,
    minLength: rules.min,
    rules: decodeDomain(rules.regles.V)
  };
};
