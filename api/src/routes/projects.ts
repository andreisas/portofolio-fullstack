// api/src/routes/projects.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import validateBody from "../middleware/validate";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const projectRouter = Router();

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  stack: z.array(z.string()).min(1),
  userId: z.number().int().positive(),
});

projectRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return next({ status: 400, message: "Invalid project ID" });
    }

    const deletedProject = await prisma.project.delete({
      where: { id },
    });

    res.json({ message: "Project deleted", project: deletedProject });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return next({ status: 404, message: "Project not found" });
    }
    next(error);
  }
});

projectRouter.put(
  "/:id",
  validateBody(projectSchema.partial()),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return next({ status: 400, message: "Invalid project ID" });
      }
      const dataToUpdate = req.body;
      const updatedProject = await prisma.project.update({
        where: { id },
        data: dataToUpdate,
      });
      res.json(updatedProject);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next({ status: 404, message: "Project not found" });
      }
      next(error);
    }
  }
);

projectRouter.post("/", validateBody(projectSchema), async (req, res, next) => {
  try {
    const { title, description, stack, userId } = req.body as {
      title: string;
      description: string;
      stack: string[];
      userId: number;
    };
    const newProject = await prisma.project.create({
      data: { title, description, stack, userId },
    });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const project = await prisma.project.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!project) {
      return next({ status: 404, message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const stack = req.query.stack as string | undefined;
    const where = stack ? { stack: { has: stack } } : {};
    const skip = (page - 1) * limit;
    const totalProjects = await prisma.project.count({ where });

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });
    res.json({
      page,
      limit,
      total: totalProjects,
      projects,
    });
  } catch (error) {
    next(error);
  }
});

export default projectRouter;
