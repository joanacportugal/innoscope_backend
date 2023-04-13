import { Request, Response } from "express";

import db from "../database/connection";

class IdeaController {
  addUserIdea(req: any, res: Response) {
    console.log(req.details);

    return res.status(200).send("ideas");
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

  getAllCommunityIdeas(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  getOneCommunityIdeaDetails(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  addOneCommunityIdeaMember(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  getOneCommunityIdeaMembers(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  addOneCommunityIdeaTask(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }

  getOneCommunityIdeaTasks(req: Request, res: Response) {
    return res.status(200).send("ideas");
  }
}

export default IdeaController;
