import { Router } from "express";
import paymentRoute from "./paymentRoutes.js"

const router = Router()
const apiRoutes = [paymentRoute]

apiRoutes.forEach((route) => router.use("/api", route))

export default router