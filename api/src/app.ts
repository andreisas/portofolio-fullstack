import express from "express";
import { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import projectRouter from "./routes/projects";
import { errorHandler } from "./middleware/errorHandler";
const prisma = new PrismaClient();
const app = express();
morgan.token("body", (req: Request) => {
  if (req.method === "POST" || req.method === "PUT") {
    return JSON.stringify(req.body);
  }
  return "";
});
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use("/projects", projectRouter);
app.get("/health", (req, res) => {
  res.json({ ok: true });
});
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
app.use(errorHandler);
export default app;
