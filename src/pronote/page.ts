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
      headers: {
        Cookie: options.cookies?.join("; ") ?? "",
        // Taken from <https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome>
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36"
      }
    });

    return {
      cookies: retrieveResponseCookies(response.headers),
      body: await response.text()
    };
  }
  catch (error) {
    console.error(error);
    throw new Error("Failed to download Pronote page.");
  }
};

