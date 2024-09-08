import type { Fetcher } from "@literate.ink/utilities";
import type { Queue } from "~/api/private/queue";
import type { SessionInformation } from "./session-information";
import type { UserParameters } from "./user-parameters";
import type { InstanceParameters } from "./instance-parameters";
import { UserResource } from "./user-resource";

export type SessionHandle = {
  /**
   * Equivalent of a PRONOTE session.
   * Contains metadata, AES keys, RSA modulus, and more.
   */
  information: SessionInformation
  instance: InstanceParameters
  user: UserParameters

  /**
   * Can be updated with the `pronote.use(number | UserResource)` method.
   * @default user.resources[0] // first resource from the user
   */
  userResource: UserResource

  readonly queue: Queue
  readonly fetcher: Fetcher

  presence: null | ReturnType<typeof setInterval>
};
