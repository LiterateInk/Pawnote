import { defaultFetcher, Fetcher } from "@literate.ink/utilities";
import { decodeSessionInformation } from "~/decoders/session-information";
import { encodeAccountKindToPath } from "~/encoders/account-kind";
import type { AccountKind, SessionInformation } from "~/models";

export const sessionInformation = async (options: {
  base: string
  kind: AccountKind,
  params: Record<string, string>
}, fetcher: Fetcher = defaultFetcher): Promise<SessionInformation> => {
  const url = new URL(options.base + "/" + encodeAccountKindToPath(options.kind));
  for (const [key, value] of Object.entries(options.params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetcher({ url, redirect: "manual" });
  const html = response.content;

  try {
    // Remove all spaces and line breaks.
    const body_cleaned = html.replace(/ /ug, "").replace(/\n/ug, "");

    // Find the relaxed JSON of the session.
    const from = "Start(";
    const to = ")}catch";

    const relaxed_data = body_cleaned.substring(
      body_cleaned.indexOf(from) + from.length,
      body_cleaned.indexOf(to)
    );

    // Convert the relaxed JSON to something we can parse.
    const session_data_string = relaxed_data
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/gu, "\"$2\": ")
      .replace(/'/gu, "\"");

    return decodeSessionInformation(JSON.parse(session_data_string), options.base);
  }
  catch (error) {
    if (html.includes("Votre adresse IP est provisoirement suspendue")) {
      throw new Error("Your IP address is temporarily suspended.");
    }
    else if (html.includes("Le site n'est pas disponible")) {
      throw new Error("The site is not available.");
    }
    else if (html.includes("Le site est momentanément indisponible")) {
      let error = "The site is temporarily unavailable";
      if (html.includes("Toutes les sessions utilisateurs sont occupées")) {
        error += ", all user sessions are busy";
      }

      throw new Error(error + ".");
    }

    throw new Error("Failed to extract session from HTML, for an unknown reason.");
  }
};
