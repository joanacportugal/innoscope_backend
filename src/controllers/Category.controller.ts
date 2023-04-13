import { Request, Response } from "express";
import db from "../database/connection";
import CategoryRecord from "../interfaces/CategoryRecord";

class CategoryController {
  async getAllCategories(req: any, res: Response) {
    try {
      const categories: CategoryRecord[] = await db("Categories").orderBy(
        "category_id"
      );
      return res.status(200).json({ categories });
    } catch (err) {
      return res.status(500).json({
        error: "An error occurred. Try again!",
      });
    }
  }
}

export default CategoryController;
