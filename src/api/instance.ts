import { type Request, defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { cleanURL } from "./helpers/clean-url";
import { decodeInstance } from "~/decoders/instance";
import type { Instance } from "~/models";

export const instance = async (url: string, fetcher: Fetcher = defaultFetcher): Promise<Instance> => {
  url = cleanURL(url);
  url += "/infoMobileApp.json?id=0D264427-EEFC-4810-A9E9-346942A862A4";

  const request: Request = { url: new URL(url) };
  const response = await fetcher(request);
  const instance = JSON.parse(response.content);
  return decodeInstance(instance);
};
