import { config } from "dotenv";
config("../.env")
export const ENVIRONMENT = process.env.ENVIRONMENT;
export const API_KEY =
  ENVIRONMENT == "development"
    ? process.env.TEST_SECRET_KEY
    : process.env.LIVE_SECRET_KEY;
export const PAYMENT_URL = process.env.PAYMENT_INITIATION_URL;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
export const HOW_TO_USE_URL = process.env.HOW_TO_USE_URL;
export const PORT = parseInt(process.env.PORT);
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const EMAIL = process.env.EMAIL;
export const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;