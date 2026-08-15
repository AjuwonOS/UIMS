export const ENVIRONMENT = process.env.ENVIRONMENT;
export const API_KEY =
  ENVIRONMENT == "test"
    ? process.env.TEST_SECRET_KEY
    : process.env.LIVE_SECRET_KEY;
export const PAYMENT_URL = process.env.PAYMENT_INITIATION_URL;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
export const DB_NAME = process.env.DB_NAME;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const GMAIL = process.env.GMAIL;
export const HOW_TO_USE_URL = "google.com"
export const PORT = parseInt(process.env.PORT)