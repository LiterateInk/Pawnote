import { loginQrCode, loginToken, createSessionHandle } from "../src";
import { credentials } from "./_credentials";
(async () => {
  console.log("------ PIN:");

  const handle = createSessionHandle();
  const refresh = await loginQrCode(handle, {
    deviceUUID: credentials.deviceUUID,
    pin: "1234", // 4 numbers you provided in Pronote.
    qr: {"avecPageConnexion":false, "jeton":"D69F7DC6F2D71E3A16BC7FC9EC326B153ECD21F4436B6410A51E77B9BBEA4C009E6F2C86E8AED18017BA9E28D363DA70CAF5F0224F1F011D6C36D9AC434BEDA275CFA9CD6E6C76C36B8FC3C03AB9C0258975B8FEC91B388AF0EE0C99D818C6276398945AF5724840B63FCA787D0AAA81", "login":"E641C7BAD9A59DC9D57C63F1D682895C", "url":"https://pronote-vm.dev/mobile.eleve.html"}
  });

  console.info("Username:", refresh.username);
  console.info("Next-Time Token:", refresh.token);

  console.log("\n------ TOKEN:");

  const next_handle = createSessionHandle();
  const next_refresh = await loginToken(next_handle, {
    // We use information from last session.
    kind: refresh.kind,
    url: refresh.url,
    username: refresh.username,
    token: refresh.token,
    deviceUUID: credentials.deviceUUID
  });

  console.info("Username:", next_refresh.username);
  console.info("Next-Time Token:", next_refresh.token);
})();
