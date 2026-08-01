import { API_KEY, PAYMENT_URL } from "../utils/constants.js";
import { userSchema } from "../utils/formValidation.js";
import { initiatePayment } from "../utils/functions.js";
import { insertTransaction } from "../utils/sqlFunctions.js";

export async function initializePaymentController(req, res) {
  try {
    const { firstName, lastName, email, costOfKey, numberOfKeys, phoneNumber } =
      req.body;
    const { success, data, error } = userSchema.safeParse({
      firstName,
      lastName,
      email,
      costOfKey,
      numberOfKeys,
      phoneNumber,
    });

    if (!success) {
      const arrayOfErrors = JSON.parse(error.message);
      console.log(arrayOfErrors);
      return res.send({ success: false, message: error }).status(400);
    }

    const { authorization_url, reference } = await initiatePayment(
      email,
      costOfKey,
      PAYMENT_URL,
      API_KEY,
    );

    const insertResponse = insertTransaction(
      reference,
      email,
      `${lastName} ${firstName}`,
      numberOfKeys,
      costOfKey,
    );
    
    if (!insertResponse)
      return res
        .send({
          success: false,
          message: "Server error",
        })
        .status(502);

    return res
      .send({
        success: true,
        message: "transaction created",
        url: authorization_url,
      })
      .status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
