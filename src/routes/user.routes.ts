import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import UserController from "../controllers/User.controller";

const router = Router();

const authController = new AuthController();
const userController = new UserController();

router.post("/login", authController.login);

router.post(
  "/me/ideas",
  authController.verifyToken,
  userController.addUserIdea
);

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
