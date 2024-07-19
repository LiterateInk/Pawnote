import { WebSpace, authenticate_with_credentials } from "pawnote";

const session = await authenticate_with_credentials(
  "https://demo.index-education.net/pronote",
  WebSpace.Students,
  "demonstration",
  "pronotevs",
  "device-uuid",
);

const session_information = session.information;
console.log(session_information.id);