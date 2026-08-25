import { Router } from "express";
import paymentRoute from "./paymentRoutes.js"
import sendUimsRoute from "./sendUimsRoute.js"
import howToUseRoute from "./howToUse.js"

const router = Router()
const apiRoutes = [paymentRoute, sendUimsRoute]

apiRoutes.forEach((route) => router.use("/v1", route))

router.use(howToUseRoute)
export default router