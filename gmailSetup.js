import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GMAIL,
  REDIRECT_URI,
} from "./utils/constants.js";
import { google } from "googleapis";
import { createTransport } from "nodemailer";

const oAuth2Client = new google.auth.OAuth2({
  client_id: GOOGLE_CLIENT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
const accessToken = await oAuth2Client.getAccessToken();
export const transporter = createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: GMAIL,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GOOGLE_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

