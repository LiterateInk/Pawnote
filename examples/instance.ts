import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const instance = await pronote.instance(credentials.pronoteURL);

  console.log("Name:", instance.name);
  console.log("Server Version:", instance.version, "\n");

  console.log(instance.accounts.length, "available account webspaces");
  for (const account of instance.accounts) {
    console.log("->", account.name, `(${account.path})`);
  }

  if (instance.casURL) {
    console.log(); // Add a line break
    console.log("CAS is activated at", instance.casURL);
    console.log("-> CAS token:", instance.casToken);
  }
}();
