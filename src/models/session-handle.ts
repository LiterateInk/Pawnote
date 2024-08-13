import type { Fetcher } from "@literate.ink/utilities";
import type { Queue } from "~/core/queue";
import type { SessionInformation } from "./session-information";

export interface SessionHandle {
  serverURL: string

  information: SessionInformation
  instance: any // TODO
  user: any // TODO

  // Initialized using `createSessionHandle`.
  readonly queue: Queue
  readonly fetcher: Fetcher
}
