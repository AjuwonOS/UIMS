import { Router } from "express";
import { initializePaymentController } from "../controller/initiatePaymentController.js";
import { confirmPaystack } from "../middleware/confirmPaystack.js";
import { successfulPaymentController } from "../controller/successfulPaymentController.js";

const router = Router();

router.post("/pay", initializePaymentController)
router.post("/successful_payment", confirmPaystack, successfulPaymentController)

export default router;
