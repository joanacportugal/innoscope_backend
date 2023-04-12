import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserRecord from "../utils/interfaces/UserRecord";
import { createUser, getOneUserByEmail } from "../utils/queries/UserQueries";
require("dotenv").config();

class AuthController {
  verifyToken(req: any, res: Response, next: NextFunction) {
    const header = req.headers["x-access-token"] || req.headers.authorization;
    if (typeof header == "undefined")
      return res.status(401).json({
        error: "You need to be authenticated to access to this route!",
      });
    const bearer = header.split(" "); // Authorization: Bearer <token>
    const token = bearer[1];
    try {
      let decoded = jwt.verify(token, process.env.SECRET || "");
      req.details = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        error: "Unauthorized!",
      });
    }
  }

  async login(req: Request, res: Response) {
    //validations
    if (!req.body.email || !req.body.name) {
      return res.status(400).json({ error: "Please provide email and name!" });
    }
    const emailParts = req.body.email.split("@");

    if (
      (emailParts.length != 2 && emailParts[0] == "") ||
      emailParts[1] == ""
    ) {
      return res.status(400).json({ error: "Please provide a valid email!" });
    }
    if (emailParts[1] != "devscope.net") {
      return res
        .status(400)
        .json({ error: "Please provide a DevScope email!" });
    }
    try {
      const val: any = await getOneUserByEmail<UserRecord>(req.body.email);
      let loggedUserId: number;

      if (!val) {
        const user = await createUser<number[]>(req.body.email, req.body.name);
        loggedUserId = user ? user[0] : 0;
      } else {
        loggedUserId = val.user_id;
      }

      const token = jwt.sign(
        { loggedUserId },
        process.env.SECRET || "secret",
        {}
      );

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({
        error: "An error occurred. Try again!",
      });
    }
  }
}

export default AuthController;
