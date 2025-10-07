import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import projectRouter from "./routes/projects";
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/projects", projectRouter);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
