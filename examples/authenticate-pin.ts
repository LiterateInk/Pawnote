import { authenticatePronoteQRCode, authenticateToken } from "../src";

(async () => {
  console.log("------ PIN:");

  const pronote = await authenticatePronoteQRCode({
    pinCode: "XXXX", // 4 numbers you provided in Pronote.
    dataFromQRCode: {
      jeton: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      login: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      url: "https://.../pronote"
    },

    // This is a unique identifier that will be used to identify the device
    // with the server. It can be anything, but it must be unique.
    deviceUUID: "my-device-uuid"
  });

  console.info("Username:", pronote.username);
  console.info("Next-Time Token:", pronote.nextTimeToken);

  console.log("\n------ TOKEN:");

  const nextPronote = await authenticateToken(pronote.pronoteRootURL, {
    // We use informations from last session.
    accountTypeID: pronote.accountTypeID,
    username: pronote.username,
    token: pronote.nextTimeToken,

    // You MUST use the same device UUID as the one you used for the first authentication.
    // The UUID used in the first request won't be stored in the class, so you must
    // have a way to get it again.
    deviceUUID: "my-device-uuid"
  });

  console.info("Username:", nextPronote.username);
  console.info("Next-Time Token:", nextPronote.nextTimeToken);
})();
