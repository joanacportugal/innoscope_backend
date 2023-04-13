import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import TechnologyController from "../controllers/Technology.controller";

const router = Router();

const authController = new AuthController();
const technologyController = new TechnologyController();

router.get(
  "/",
  authController.verifyToken,
  technologyController.getAllTechnologies
);

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
