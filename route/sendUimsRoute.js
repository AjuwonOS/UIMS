import { Router } from "express";
import { sendUimsController } from "../controller/sendUimsController.js";

const router = Router()

router.get("/send_uims",((req, res, next) => {
  const originalEnd = res.end;

  res.end = function (...args) {
    console.log({
      method: req.method,
      url: req.originalUrl,
      userAgent: req.get("user-agent"),
      status: res.statusCode
    });

    return originalEnd.apply(this, args);
  };

  next();
}), sendUimsController)

export default router