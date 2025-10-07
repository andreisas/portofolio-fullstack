// api/src/routes/projects.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const projectRouter = Router();

projectRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });
    res.json({
      page,
      limit,
      projects,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default projectRouter;
