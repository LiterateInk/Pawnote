import { PronoteApiAccountId } from "../constants/accounts";
import { retrieveResponseCookies } from "../utils/headers";

export const downloadPronotePage = async (options: {
  pronoteURL: string
  cookies?: string[]
}): Promise<{
  /** Response from the page as text. */
  body: string
  /** Cookies that were set by the page. */
  cookies: string[]
}> => {
  try {
    const response = await fetch(options.pronoteURL, {
      method: "GET",
      redirect: "manual",
      headers: { Cookie: options.cookies?.join("; ") ?? "" }
    });

    return {
      cookies: retrieveResponseCookies(response.headers),
      body: await response.text()
    };
  }
  catch (error) {
    console.error(error);
    throw new Error(`Failed to download Pronote page.`);
  }
};

