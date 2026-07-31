import crypto from "crypto"
import { API_KEY } from "../utils/constants.js";

export function confirmPaystack(req, res, next) {
    const hash = crypto
      .createHmac("sha512", API_KEY)
      .update(JSON.stringify(req.body))
        .digest("hex");
    
    if (hash == req.headers["x-paystack-signature"]) {
      next()
    }
    res.status(401)
}