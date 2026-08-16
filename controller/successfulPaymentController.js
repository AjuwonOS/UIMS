import { randomBytes } from "crypto";
import {
  insertKey,
  queryTransaction,
  updateTransactionToSuccessful,
} from "../utils/sqlFunctions.js";
import {
  createApiKeysAndInsertInDb,
  emailTemplate,
  generateEmailMessage,
  sendMail,
} from "../utils/functions.js";
import { GMAIL } from "../utils/constants.js";

export async function successfulPaymentController(req, res) {
  try {
    const {
      event,
      data: {
        reference,
        amount,
        customer: { email },
      },
    } = req.body;

    if (event === "charge.success") res.send(200);

    const { costoftransaction, numberofkeys, fullname } = await
      queryTransaction(reference);
    
    if (!costoftransaction) return;
    
    if (costoftransaction * 100 !== amount) return;

    await updateTransactionToSuccessful(reference);

    const apiKeys = await createApiKeysAndInsertInDb(numberofkeys, email);

    //Send Keys to email
    const message = await generateEmailMessage(email, fullname, apiKeys);
    await sendMail(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
