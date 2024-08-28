export class BadCredentialsError extends Error {
  constructor() {
    super("Unable to resolve the challenge, make sure the credentials or token are corrects");
    this.name = "BadCredentialsError";
  }
}

export class AuthenticateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticateError";
  }
}

export class AccessDeniedError extends Error {
  constructor() {
    super("You do not have access to this area or your authorizations are insufficient");
    this.name = "AccessDeniedError";
  }
}

export class AccountDisabledError extends Error {
  constructor() {
    super("Your account has been deactivated");
    this.name = "AccountDisabledError";
  }
}
