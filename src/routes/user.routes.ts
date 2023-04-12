import { Router } from "express";
import AuthController from "../controllers/Auth.controller";

const router = Router();

const authController = new AuthController();

router.post("/login", authController.login);

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
