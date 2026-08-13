import crypto, { randomBytes } from "crypto";
import { insertKey } from "./sqlFunctions.js";
import { createTransporter } from "../gmailSetup.js";
import { GMAIL, HOW_TO_USE_URL } from "./constants.js";

export async function initiatePayment(email, costOfKey, paymentUrl, apiKey) {
  const response = await fetch(paymentUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      amount: `${costOfKey}00`,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.data;
}

export function createApiKeysAndInsertInDb(numberOfKeys, email) {
  const apiKeysArray = [];
  for (let i = 0; i < numberOfKeys; i++) {
    const apiKey = randomBytes(16).toString("hex");
    apiKeysArray.push(apiKey);
    insertKey(apiKey, email);
  }
  return apiKeysArray;
}

export async function sendMail(message) {
    try {
        const transporter = await createTransporter();
        
    if (!transporter) {
      console.log("Email service unavailable.");
    }
    const result = await transporter.sendMail(message);
    return result;
  } catch (error) {
    console.log("Email not sent. Error:", error);
  }
}

export function generateEmailMessage(email, fullName, apiKeys) {
  return {
    from: GMAIL,
    to: email,
    subject: "UIMS Key Purchase Confirmation",
    text: "This is the plaintext version of the email.",
    html: emailTemplate(fullName, apiKeys, HOW_TO_USE_URL),
  };
}

export const emailTemplate = (name, keys, howToUseUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UIMS Purchase Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f4; padding:40px 20px;">
        <tr>
            <td align="center">

                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background:#2563eb; padding:24px; text-align:center;">
                            <h1 style="margin:0; color:#ffffff; font-size:28px;">
                                UIMS
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px 32px; color:#333333; line-height:1.7;">

                            <h2 style="margin-top:0; color:#111827;">
                                Hello, ${name}!
                            </h2>

                            <p style="font-size:16px;">
                                Thank you for purchasing <strong>UIMS key(s)</strong>.
                            </p>

                            <p style="font-size:16px; margin-bottom:12px;">
                                <strong>Your key(s):</strong>
                            </p>

                            <div style="background:#f8fafc; border:1px solid #d1d5db; border-radius:6px; padding:16px; font-family:'Courier New', monospace; font-size:15px; white-space:pre-line;">
${keys}
                            </div>

                            <div style="text-align:center; margin:36px 0;">
                                <a href="${howToUseUrl}"
                                   style="background:#2563eb;
                                          color:#ffffff;
                                          text-decoration:none;
                                          padding:14px 28px;
                                          border-radius:6px;
                                          display:inline-block;
                                          font-size:16px;
                                          font-weight:bold;">
                                    How to Use
                                </a>
                            </div>

                            <p style="margin-bottom:0;">
                                Yours sincerely,
                            </p>

                            <p style="margin-top:4px; font-weight:bold;">
                                UIMS Team
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px; text-align:center; font-size:13px; color:#6b7280; background:#f9fafb;">
                            © ${new Date().getFullYear()} UIMS. All rights reserved.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`;
