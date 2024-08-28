export class SuspendedIPError extends Error {
  constructor() {
    super("Your IP address has been suspended");
    this.name = "SuspendedIPError";
  }
}

export class SessionExpiredError extends Error {
  constructor() {
    super("The session has expired");
    this.name = "SessionExpiredError";
  }
}


export class PageUnavailableError extends Error {
  constructor() {
    super("The requested page does not exist");
    this.name = "PageUnavailableError";
  }
}

export class BusyPageError extends Error {
  constructor() {
    super("The site is temporarily unavailable");
    this.name = "BusyPageError";
  }
}

export class RateLimitedError extends Error {
  constructor() {
    super("You've been rate-limited");
    this.name = "RateLimitedError";
  }
}

export class ServerSideError extends Error {
  constructor(message = "An error occurred, server-side") {
    super(message);
    this.name = "ServerSideError";
  }
}
