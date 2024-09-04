import { decodeSecurityModal } from "~/decoders/security-modal";
import type { SecurityModal } from "../security-modal";

export class SecurityError extends Error {
  public handle: SecurityModal;

  constructor (authentication: any, identity: any, initialUsername?: string) {
    super("You're asked to custom your security methods");
    this.name = "SecurityError";
    this.handle = decodeSecurityModal(authentication, identity, initialUsername);
  }
}

export class SecuritySourceTooLongError extends Error {
  constructor (limit: number) {
    super(`The source name is too long, limited to ${limit} characters`);
    this.name = "SecuritySourceTooLongError";
  }
}
