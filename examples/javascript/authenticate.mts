import { load_async, Webspace, authenticate_with_credentials } from "pawnote";
await load_async();

const session = await authenticate_with_credentials(
  "https://demo.index-education.net/pronote",
  Webspace.Students,
  "demonstration",
  "pronotevs",
  "device-uuid",
);

const session_information = session.information;
console.log(session_information.id);