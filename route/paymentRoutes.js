import { Router } from "express";
import { initializePaymentController } from "../controller/initiatePaymentController.js";

const router = Router();

router.post("/pay", initializePaymentController)

export default router;
