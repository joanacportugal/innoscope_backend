import { Request, Response } from "express";

import IdeaRecord from "../interfaces/IdeaRecord";
import db from "../database/connection";

class UserController {
  async addUserIdea(req: any, res: Response) {
    const {
      title,
      summary,
      description,
      category,
      complexity,
      duration,
      technologies,
      coauthors,
      isAnon,
      details,
    } = req.body;

    try {
      // validate coauthors existence
      if (coauthors) {
        const idea_coauthors = await db("Users").whereIn("user_id", coauthors);
        if (idea_coauthors.length != coauthors.length) {
          return res.status(500).json({
            error: "Some authors you're trying to add don't exist.",
          });
        }
      }
      // validate technologies existence
      if (technologies) {
        const idea_technologies = await db("Technologies").whereIn(
          "technology_id",
          technologies
        );
        if (idea_technologies.length != technologies.length) {
          return res.status(500).json({
            error: "Some technologies you're trying to add don't exist.",
          });
        }
      }

      await db.transaction(async (trx) => {
        try {
          const ideaItem: IdeaRecord = {
            idea_title: title,
            idea_description: description,
            category: category,
            idea_complexity: complexity,
            idea_durationWeeks: duration,
            idea_isAnon: Boolean(isAnon),
            idea_details: details,
          };
          const idea = await trx("Ideas").insert(ideaItem);
          let list = coauthors
            ? [req.details.loggedUserId, ...coauthors]
            : [req.details.loggedUserId];
          await trx("Idea_Author").insert(
            list.map((user) => ({ user, idea: idea[0] }))
          );
          if (technologies) {
            await trx("Idea_Technology").insert(
              technologies.map((technology: any) => ({
                technology,
                idea: idea[0],
              }))
            );
          }
          return res
            .status(200)
            .json({ message: "Idea created successfully." });
        } catch (err) {
          console.log(err);

          trx.rollback();
          return res.status(500).json({
            error: "An error occurred. Try again!",
          });
        }
      });
    } catch (err) {
      return res.status(500).json({
        error: "An error occurred. Try again!",
      });
    }
  }

  async getAllUserIdeas(req: any, res: Response) {
    let per_page = req.query.per_page || 4;
    let curr_page = req.query.curr_page || 1;
    try {
      const totalRows: any = await db("Ideas").count("* as count").first();
      const offset = (curr_page < 1 ? curr_page : curr_page - 1) * per_page;
      const last_page = Math.ceil(totalRows.count / per_page);
      let pagination = {
        total: totalRows.count,
        per_page: per_page || 20,
        curr_page: curr_page || 1,
        prev_page: curr_page == 1 ? null : curr_page - 1,
        next_page: curr_page == last_page ? null : curr_page + 1,
        offset,
        to: offset + per_page,
        last_page,
      };

      const allIdeas = await db("Ideas")
        .join("Idea_Author", "Ideas.idea_id", "=", "Idea_Author.idea")
        .join("Categories", "Ideas.category", "=", "Categories.category_id")
        .where("Idea_Author.user", req.details.loggedUserId)
        .offset(pagination.offset)
        .limit(pagination.per_page);
      let ideas = [];

      for (const ideaItem of allIdeas) {
        const technologies = await db("Technologies").join(
          "Idea_Technology",
          "Technologies.technology_id",
          "=",
          "Idea_Technology.technology"
        );
        let item = {
          id: ideaItem.idea_id,
          title: ideaItem.idea_title,
          description: ideaItem.idea_description,
          category: ideaItem.category_name,
          complexity: ideaItem.idea_complexity,
          duration: ideaItem.idea_durationWeeks,
          status: ideaItem.idea_status,
          details: ideaItem.idea_details || "",
          technologies: technologies.map((t) => t.technology_name),
        };
        ideas.push(item);
      }
      return res.status(200).json({ ideas, pagination });
    } catch (err) {
      return res.status(500).json({
        error: "An error occurred. Try again!",
      });
    }
  }

  getOneUserIdea(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  editOneUserIdea(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }
}

export default UserController;
