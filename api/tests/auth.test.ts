import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
import request from "supertest";
import app from "../src/app";
import { PrismaClient } from "@prisma/client";
import { describe, it, expect } from "@jest/globals";

const prisma = new PrismaClient();

describe("Auth API", () => {
  const newUser = {
    name: "Auth Tester",
    email: "auth-tester@example.com",
    password: "testpass",
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).not.toHaveProperty("passwordHash");
  });

  it("should login with correct credentials and set a cookie", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: newUser.email, password: newUser.password });
    expect(res.status).toBe(200);
    const setHeader = res.headers["set-cookie"];
    expect(setHeader).toBeDefined();
  });

  it("should logout and clear cookie", async () => {
    // login first
    const login = await request(app)
      .post("/auth/login")
      .send({ email: newUser.email, password: newUser.password });
    const setHeader = login.headers["set-cookie"];
    const set = Array.isArray(setHeader)
      ? setHeader
      : setHeader
      ? [setHeader as string]
      : undefined;
    const cookie = set && set.length ? set[0].split(";")[0] : "";

    const res = await request(app).post("/auth/logout").set("Cookie", cookie);
    expect(res.status).toBe(204);
  });

  it("should forbid project creation for non-admins", async () => {
    // use new user cookie
    const login = await request(app)
      .post("/auth/login")
      .send({ email: newUser.email, password: newUser.password });
    const setHeader = login.headers["set-cookie"];
    const set = Array.isArray(setHeader)
      ? setHeader
      : setHeader
      ? [setHeader as string]
      : undefined;
    const cookie = set && set.length ? set[0].split(";")[0] : "";

    const res = await request(app)
      .post("/projects")
      .set("Cookie", cookie)
      .send({ title: "X", description: "Y", stack: ["A"], userId: 1 });

    expect(res.status).toBe(403);
  });
});
