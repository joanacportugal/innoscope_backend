import { Router } from "express";

const router = Router();

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
