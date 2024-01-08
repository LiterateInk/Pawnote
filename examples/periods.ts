import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const { periods } = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  periods.forEach((period) => {
    console.info(period.name, "starts the", period.start.toLocaleString(), "ends the", period.end.toLocaleString());
  });
})();
