import { Router } from "express";

import AuthController from "../controllers/Auth.controller";
import UserController from "../controllers/User.controller";

import LoginValidator from "../utils/validators/LoginValidator";
import SendIdeaValidator from "../utils/validators/SendIdeaValidator";
import validationErrors from "../utils/validators/ValidationErrors";
import PaginationValidator from "../utils/validators/PaginationValidator";

const router = Router();
const authController = new AuthController();
const userController = new UserController();

router.post("/login", LoginValidator, validationErrors, authController.login);

router
  .route("/me/ideas")
  .get(
    authController.verifyToken,
    PaginationValidator,
    validationErrors,
    userController.getAllUserIdeas
  )
  .post(
    authController.verifyToken,
    SendIdeaValidator,
    validationErrors,
    userController.addUserIdea
  );

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
