import type { Fetcher } from "@literate.ink/utilities";
import type { Queue } from "~/api/private/queue";
import type { SessionInformation } from "./session-information";

export interface SessionHandle {
  /**
   * Initialized after a login.
   *
   * Parsed response for a PRONOTE session.
   * Contains metadata, AES keys, RSA modulus, and more.
   */
  information: SessionInformation

  /**
   * Initialized after a login.
   *
   * Raw response for the instance parameters.
   * Contains a lot of various data, very hard to predict.
   */
  instance: any

  /**
   * Initialized after a login.
   *
   * Raw response for the user parameters.
   * Contains a lot of various data, very hard to predict.
   */
  user: any

  readonly queue: Queue
  readonly fetcher: Fetcher
}
