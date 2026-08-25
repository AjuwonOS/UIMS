import { Router } from "express";

const router = Router()
router.get("/how-to-use", (req, res) => {
  res.sendFile(`${process.cwd()}/client/how-to-use.html`);
});

export default router