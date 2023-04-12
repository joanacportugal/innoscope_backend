import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
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
}

export default AuthController;
