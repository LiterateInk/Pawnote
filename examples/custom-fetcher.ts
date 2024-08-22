import * as pronote from "../src";
import { credentials } from "./_credentials";
import type { Fetcher } from "@literate.ink/utilities";

const customFetcher: Fetcher = async (options) => {
  console.time(options.url.href);

  const response = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
    body: options.method !== "GET" ? options.content : void 0,
    redirect: options.redirect
  });

  const content = await response.text();
  console.timeEnd(options.url.href);

  return {
    content,
    status: response.status,

    // We can even write a function on the headers getter.
    get headers () {
      console.info("-> Reading headers from fetcher !");
      return response.headers;
    }
  };
};

void async function main () {
  console.group("geolocation");
  const geolocationResults = await pronote.geolocation({
    latitude: 45.849998,
    longitude: 1.25
  }, customFetcher);

  console.info("There's", geolocationResults.length, "instances in the given location.");
  console.groupEnd();

  console.group("loginCredentials");
  const session = pronote.createSessionHandle(customFetcher);
  await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  console.groupEnd();
}();
