import { randomBytes } from "crypto";
import {
  insertKey,
  queryTransaction,
  updateTransactionToSuccessful,
} from "../utils/sqlFunctions.js";
import { createApiKeysAndInsertInDb, emailTemplate, generateEmailMessage, sendMail } from "../utils/functions.js";
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

    const { costOfTransaction, numberOfKeys, fullName } = queryTransaction(reference);

    if (!costOfTransaction) return;

    if (costOfTransaction * 100 !== amount) return;

    updateTransactionToSuccessful(reference);
    
    const apiKeys =  createApiKeysAndInsertInDb(numberOfKeys, email)
    
    //Send Keys to email
    const message = generateEmailMessage(email, fullName, apiKeys)
    await sendMail(message)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
const con = { transactionID: "or3s02o6rb", costOfTransaction: 10300 };
