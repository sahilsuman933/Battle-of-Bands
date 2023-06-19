import dotenv from "dotenv";
dotenv.config();

export const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  OPENAI_API_KEY,
} = process.env;
