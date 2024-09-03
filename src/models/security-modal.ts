import type { DoubleAuthMode } from "./double-auth-mode";
import type { PasswordRules } from "./password-rules";

export type SecurityModal = Readonly<{
  availableSecurityModes: DoubleAuthMode[];
  defaultSecurityMode: DoubleAuthMode;
  passwordRules: PasswordRules;

  shouldCustomPassword: boolean;
  shouldCustomDoubleAuth: boolean;

  /**
   * Should be internal use only.
   */
  context: {
    authentication: any,
    identity: any,
    initialUsername?: string
  }
}>;
