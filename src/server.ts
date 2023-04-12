import express from "express";
import cors from "cors";
import router from "./routes";

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "127.0.0.1";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.use("/api/v1", router);

app.all("*", (req, res) => res.status(404).json({ error: "Route not found!" }));

app.listen(port, host, () =>
  console.log(`App listening at http://${host}:${port}/`)
);
