import { authenticatePronoteCredentials, PronoteApiAccountId, findPronoteInstances, type PawnoteFetcher } from "../src";

const customFetcher: PawnoteFetcher = async (url, options) => {
  console.time("request from fetcher");

  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.method !== "GET" ? options.body : void 0,
    redirect: options.redirect
  });

  console.timeEnd("request from fetcher");

  return {
    json: async <T>() => {
      const data = await response.json() as T;

      // We can add stuff in those methods too !
      console.info("-> Parsing a JSON in fetcher !");

      return data;
    },

    text: async () => {
      const data = await response.text();

      // We can add stuff in those methods too !
      console.info("-> Reading the response as text...");

      return data;
    },

    // We can even write a function on the headers getter.
    get headers () {
      console.info("-> Reading headers from fetcher !");
      return response.headers;
    }
  };
};

(async () => {
  console.group("findPronoteInstances");
  const geolocationResults = await findPronoteInstances(customFetcher, {
    latitude: 45.849998,
    longitude: 1.25
  });

  console.info("\nThere's", geolocationResults.length, "instances in the given location.");
  console.groupEnd();

  console.group("authenticate");
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid",

    // We use our custom fetcher here !
    fetcher: customFetcher
  });

  console.info("\nThere's", pronote.periods.length, "periods in the given pronote account.");
  console.groupEnd();
})();
