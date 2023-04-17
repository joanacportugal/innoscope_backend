import { body } from "express-validator";

const LoginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .custom((value) => {
      const emailParts = value.split("@");
      if (emailParts[1] != "devscope.net") {
        throw new Error("Please enter a DevScope email.");
      }
    }),
  body("name").isString().notEmpty().withMessage("Please enter a valid name."),
];

export default LoginValidator;
