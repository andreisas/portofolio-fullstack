// api/src/routes/projects.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const projectRouter = Router();

projectRouter.post("/", async (req, res) => {
  try {
    const projectSchema = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      stack: z.array(z.string()).min(1),
      userId: z.number().int().positive(),
    });
    const result = projectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { title, description, stack, userId } = result.data;
    const newProject = await prisma.project.create({
      data: { title, description, stack, userId },
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

projectRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const project = await prisma.project.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

projectRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const stack = req.query.stack as string | undefined;
    const where = stack ? { stack: { has: stack } } : {};
    const skip = (page - 1) * limit;

    const projects = await prisma.project.findMany({
      where,
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
