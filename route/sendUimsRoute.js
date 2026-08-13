import { Router } from "express";
import { sendUimsController } from "../controller/sendUimsController.js";

const router = Router()

router.get("/send_uims", sendUimsController)

export default router