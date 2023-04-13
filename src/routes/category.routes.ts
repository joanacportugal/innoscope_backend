import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import CategoryController from "../controllers/Category.controller";

const router = Router();

const authController = new AuthController();
const categoryController = new CategoryController();

router.get(
  "/",
  authController.verifyToken,
  categoryController.getAllCategories
);

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
