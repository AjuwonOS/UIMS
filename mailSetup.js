import { RESEND_API_KEY } from "./utils/constants.js";
import { Resend } from "resend";
export const resend = new Resend(RESEND_API_KEY);