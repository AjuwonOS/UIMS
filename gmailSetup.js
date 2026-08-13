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
/* const accessToken = await oAuth2Client.getAccessToken(); */

export async function getAccessToken() {
  try {
    const token = await oAuth2Client.getAccessToken();
    if (!token) throw new Error("No access token returned");

    return token;
  } catch (error) {
    console.log("Failed to obtain Google Access token:", error);
    return null;
  }
}

export async function createTransporter() {
  const accessToken = await getAccessToken();

  if (!accessToken) return null;

  return createTransport({
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
}
