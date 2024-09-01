package models.errors

class SuspendedIPError: Exception("Your IP address has been suspended")

class SessionExpiredError: Exception("The session has expired")

class PageUnavailableError: Exception("The requested page does not exist")

class BusyPageError: Exception("The site is temporarily unavailable")

class RateLimitedError: Exception("You've been rate-limited")

class ServerSideError(message: String = "An error occurred, server-side"): Exception(message)