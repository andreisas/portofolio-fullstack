import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
import request from "supertest";
import app from "../src/app";
import { PrismaClient } from "@prisma/client";
import { describe, it, expect, beforeAll } from "@jest/globals";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

describe("Projects API", () => {
  let testProjectId: number;
  const testUser = { id: 1 }; // Created in setup.ts
  let adminCookie: string;
  let adminAuth: string;

  const testProject = {
    title: "Test Project",
    description: "Test Description",
    stack: ["Node.js", "TypeScript"],
    userId: testUser.id,
  };

  beforeAll(async () => {
    // ensure we have an admin cookie for protected endpoints
    const admin = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    });
    if (admin) {
      const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d",
        }
      );
      adminCookie = `token=${token}`;
      adminAuth = `Bearer ${token}`;
    }
  });

  describe("POST /projects", () => {
    it("should create a new project", async () => {
      // login as admin to get cookie for protected route
      if (!adminCookie) {
        const login = await request(app)
          .post("/auth/login")
          .send({ email: "admin@example.com", password: "adminpass" });
        const setHeader = login.headers["set-cookie"];
        const set = Array.isArray(setHeader)
          ? setHeader
          : setHeader
          ? [setHeader as string]
          : undefined;
        adminCookie = set && set.length ? set[0].split(";")[0] : "";
      }

      const res = await request(app)
        .post("/projects")
        .set("Cookie", adminCookie)
        .set("Authorization", adminAuth)
        .send(testProject);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.title).toBe(testProject.title);

      testProjectId = res.body.id;
    });

    it("should return 400 for invalid project data", async () => {
      const res = await request(app)
        .post("/projects")
        .set("Cookie", adminCookie)
        .set("Authorization", adminAuth)
        .send({ title: "" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid data");
      expect(res.body).toHaveProperty("details");
      expect(Array.isArray(res.body.details)).toBe(true);
    });
  });

  describe("GET /projects", () => {
    it("should return paginated projects", async () => {
      const res = await request(app)
        .get("/projects")
        .query({ page: 1, limit: 5 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("projects");
      expect(res.body).toHaveProperty("total");
      expect(res.body).toHaveProperty("page", 1);
      expect(res.body).toHaveProperty("limit", 5);
    });

    it("should filter projects by stack", async () => {
      const res = await request(app)
        .get("/projects")
        .query({ stack: "Node.js" });

      expect(res.status).toBe(200);
      expect(res.body.projects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            stack: expect.arrayContaining(["Node.js"]),
          }),
        ])
      );
    });
  });

  describe("GET /projects/:id", () => {
    it("should return a project by id", async () => {
      const res = await request(app).get(`/projects/${testProjectId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", testProjectId);
      expect(res.body).toHaveProperty("user");
    });

    it("should return 404 for non-existent project", async () => {
      const res = await request(app).get("/projects/99999");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Project not found");
    });
  });

  describe("PUT /projects/:id", () => {
    it("should update a project", async () => {
      const updateData = {
        title: "Updated Project",
      };

      const res = await request(app)
        .put(`/projects/${testProjectId}`)
        .set("Cookie", adminCookie)
        .set("Authorization", adminAuth)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(updateData.title);
    });
  });

  describe("DELETE /projects/:id", () => {
    it("should delete a project", async () => {
      const res = await request(app)
        .delete(`/projects/${testProjectId}`)
        .set("Cookie", adminCookie)
        .set("Authorization", adminAuth);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Project deleted");
    });
  });
});
