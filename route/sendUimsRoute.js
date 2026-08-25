import { Router } from "express";
import { sendUimsController } from "../controller/sendUimsController.js";

const router = Router()

router.get("/send_uims",((req, res, next) => {
  const originalEnd = res.end;

  res.end = function (...args) {
    console.log({
      contentType: res.get("content-type"),
      contentLength: res.get("content-length"),
    });

    return originalEnd.apply(this, args);
  };

  next();
}), sendUimsController)

export default router