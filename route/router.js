import { Router } from "express";
import paymentRoute from "./paymentRouter.js"

const router = Router()
const apiRoutes = [paymentRoute]

apiRoutes.forEach((route) => router.use("/api", route))

export default router