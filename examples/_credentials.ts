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

if (!process.env.PRONOTE_URL || !process.env.USERNAME || !process.env.PASSWORD) {
  throw new ExampleCredentialsError();
}

// Export the credentials.
export const credentials = {
  pronoteURL: process.env.PRONOTE_URL,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  deviceUUID: "my-device-uuid" // Make this a random unique string for security reasons.
};
