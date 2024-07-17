import { WebSpace, authenticate_with_credentials } from "pawnote";

const session = await authenticate_with_credentials(
  "https://demo.index-education.net/pronote",
  WebSpace.Students,
  "demonstration",
  "pronotevs",
  "device-uuid",
);

console.log({
  id: session.id,
  web_space: session.web_space,
  demo: session.demo,
  ent_username: session.ent_username,
  ent_password: session.ent_password,
  access_type: session.access_type,
  modulus_rsa: session.modulus_rsa,
  exponent_rsa: session.exponent_rsa,
  skip_encryption: session.skip_encryption,
  skip_compression: session.skip_compression,
  http: session.http,
  poll: session.poll,
});
