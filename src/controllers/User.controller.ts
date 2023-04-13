import { Request, Response } from "express";

import IdeaRecord from "../interfaces/IdeaRecord";
import { getIdeaCreationErrors } from "../utils/errorValidations/user";

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
    // validate body
    let error = getIdeaCreationErrors(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

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
          if (coauthors) {
            let list = coauthors
              ? [req.details.loggedUserId, ...coauthors]
              : [req.details.loggedUserId];
            await trx("Idea_Author").insert(
              list.map((user) => ({ user, idea: idea[0] }))
            );
          }
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

  getAllUserIdeas(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  getOneUserIdea(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  editOneUserIdea(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }
}

export default UserController;
