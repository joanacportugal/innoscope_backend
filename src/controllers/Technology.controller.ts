import { Request, Response } from "express";

import db from "../database/connection";
import TechnologyRecord from "../interfaces/TechnologyRecord";

class TechnologyController {
  async getAllTechnologies(req: any, res: Response) {
    try {
      const technologies: TechnologyRecord[] = await db("Technologies").orderBy(
        "technology_id"
      );
      return res.status(200).json({ technologies });
    } catch (err) {
      return res.status(500).json({
        error: "An error occurred. Try again!",
      });
    }
  }
}

export default TechnologyController;
