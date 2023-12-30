import { authenticatePronoteCredentials, authenticateToken, PronoteApiAccountId } from "../src";

(async () => {
  const pronoteBaseURL = "http://192.168.112.138:8888/pronote/owo";
  
  console.log("------ CREDS:");

  const pronote = await authenticatePronoteCredentials(pronoteBaseURL, {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "lrezine",
    password: "pronotevs",

    // This is a unique identifier that will be used to identify the device
    // with the server. It can be anything, but it must be unique.
    deviceUUID: 'my-device-uuid',
  });

  console.info("Username:", pronote.username);
  console.info("Next-Time Token:", pronote.nextTimeToken);
  
  // We login now using the token to prove the point.
  console.log("\n------ TOKEN:");

  const nextPronote = await authenticateToken(pronoteBaseURL, {
    accountTypeID: PronoteApiAccountId.Eleve,
    // We use informations from last session.
    username: pronote.username,
    token: pronote.nextTimeToken,
    
    // You MUST use the same device UUID as the one you used for the first authentication.
    // The UUID used in the first request won't be stored in the class, so you must
    // have a way to get it again.
    deviceUUID: "my-device-uuid",
  });

  console.info("Username:", nextPronote.username);
  console.info("Next-Time Token:", nextPronote.nextTimeToken);
})();
