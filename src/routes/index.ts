import { Router } from "express";

import categoryRouter from "./category.routes";
import ideaRouter from "./idea.routes";
import technologyRouter from "./technology.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/ideas", ideaRouter);
router.use("/technologies", technologyRouter);
router.use("/users", userRouter);

router.all("*", (req, res) =>
  res.status(404).json({ error: "Route not found!" })
);

export default router;
