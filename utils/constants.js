export const ENVIRONMENT = process.env.ENVIRONMENT;
export const API_KEY =
  ENVIRONMENT == "test"
    ? process.env.TEST_SECRET_KEY
    : process.env.LIVE_SECRET_KEY;
export const PAYMENT_URL = process.env.PAYMENT_INITIATION_URL;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING