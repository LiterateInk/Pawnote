import type { AccountKind, RefreshInformation, SessionHandle } from "~/models";
import { sessionInformation } from "./session-information";
import { instanceParameters } from "./private/instance-parameters";
import { cleanURL } from "./helpers/clean-url";

export const loginCredentials = async (session: SessionHandle, auth: {
  url: string
  username: string
  password: string
  kind: AccountKind
  deviceUUID: string
}): Promise<RefreshInformation> => {
  const base = cleanURL(auth.url);

  // Make the request.
  session.information = await sessionInformation({
    base,
    kind: auth.kind,
    params: {
      fd: "1",
      login: "true",
      bydlg: "A6ABB224-12DD-4E31-AD3E-8A39A1C2C335"
    }
  }, session.fetcher);

  session.instance = await instanceParameters(session);

  return {
    // TODO
    token: "",
    username: auth.username,

    kind: auth.kind
  };
};
