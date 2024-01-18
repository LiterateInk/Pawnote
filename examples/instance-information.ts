import { getPronoteInstanceInformation, defaultPawnoteFetcher } from "../src";

(async () => {
  const instance = await getPronoteInstanceInformation(defaultPawnoteFetcher, {
    pronoteURL: "https://demo.index-education.net/pronote"
  });

  console.log("Root URL:", instance.pronoteRootURL);
  console.log("School Name:", instance.schoolName);
  console.log("Server Version:", instance.version);
  
  console.group("Available account types:", instance.accounts.length);
  instance.accounts.forEach(account => {
    console.log("->", account.name, `(${account.id})`);
  })
  console.groupEnd();

  if (instance.entURL) {
    console.log("ENT is activated, base URL is", instance.entURL);
    console.log("-> ENT token:", instance.entToken!);
  }
})();
