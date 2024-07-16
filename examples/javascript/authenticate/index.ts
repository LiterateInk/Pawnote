import { WebSpace, authenticate_with_credentials } from "pawnote";

const response = await authenticate_with_credentials(
  "https://demo.index-education.net/pronote",
  WebSpace.Students,
  "demonstration",
  "pronotevs",
  "device-uuid",
);

console.log(response);
