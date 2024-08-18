import { config } from "dotenv";
import { join } from "node:path";
// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

class ExampleCredentialsError extends Error {
  constructor() {
    super("You need to provide credentials in the `.env` file.");
    this.name = "ExampleCredentialsError";
  }
}

if (!process.env.PRONOTE_URL) {
  throw new ExampleCredentialsError();
}

// Export the credentials.
export const credentials = {
  pronoteURL: process.env.PRONOTE_URL,

  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,

  parent_username: process.env.PARENT_USERNAME!,
  parent_password: process.env.PARENT_PASSWORD!,

  deviceUUID: "my-device-uuid" // Make this a random unique string for security reasons.
};
