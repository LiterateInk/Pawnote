import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  // Start presence requests every 2 minutes.
  pronote.startPresenceRequests();
  // Stop presence after 5 minutes.
  setTimeout(() => pronote.stopPresenceRequests(), 5 * 60 * 1000);
})();
