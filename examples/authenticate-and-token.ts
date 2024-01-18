import { authenticatePronoteCredentials, authenticateToken, PronoteApiAccountId } from "../src";

(async () => {
  const pronoteBaseURL = "https://demo.index-education.net/pronote";

  console.log("------ CREDS:");

  const pronote = await authenticatePronoteCredentials(pronoteBaseURL, {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "demonstration",
    password: "pronotevs",

    // This is a unique identifier that will be used to identify the device
    // with the server. It can be anything, but it must be unique.
    deviceUUID: "my-device-uuid"
  });

  console.info("Username:", pronote.username);
  console.info("Next-Time Token:", pronote.nextTimeToken);

  // Demonstration instances can't use next-time tokens.
  if (!pronote.isDemo) {
    // We login now using the token to prove the point.
    console.log("\n------ TOKEN:");

    const nextPronote = await authenticateToken(pronoteBaseURL, {
      // We can use informations from last session.
      accountTypeID: pronote.accountTypeID,
      username: pronote.username,
      // And here, we **must** use the token given.
      token: pronote.nextTimeToken,

      // You MUST use the same device UUID as the one you used for the first authentication.
      // The UUID used in the first request won't be stored in the class, so you must
      // have a way to get it again.
      deviceUUID: "my-device-uuid"
    });

    console.info("Username:", nextPronote.username);
    console.info("Next-Time Token:", nextPronote.nextTimeToken);
  }
  else console.info("\nYou're connected to a demonstration instance, thus you're not able to use the next-time token.");
})();
