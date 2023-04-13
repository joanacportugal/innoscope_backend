import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import IdeaController from "../controllers/Idea.controller";

const router = Router();

const authController = new AuthController();
const ideaController = new IdeaController();

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
