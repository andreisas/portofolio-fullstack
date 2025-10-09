import express from "express";
import { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import projectRouter from "./routes/projects";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

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
app.use(cookieParser());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

app.use("/auth", authRouter);
app.use("/projects", projectRouter);
// serve OpenAPI docs if present
try {
  const openapi = YAML.load("./docs/openapi.yaml");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
} catch (err: unknown) {
  // ignore if docs are not present in some environments
  if (err && typeof err === "object" && "message" in err) {
    // @ts-ignore - runtime message
    console.warn("OpenAPI docs not mounted:", (err as any).message);
  } else {
    console.warn("OpenAPI docs not mounted");
  }
}
app.get("/health", (req, res) => {
  res.json({ ok: true });
});
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
app.use(errorHandler);

export default app;
