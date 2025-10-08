import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { beforeAll, afterAll, jest } from "@jest/globals";

// Note: Environment variables are loaded by jest.env.ts before this runs
const prisma = new PrismaClient();

beforeAll(async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  // Reset the database before running tests
  await prisma.$executeRawUnsafe(`DROP SCHEMA public CASCADE;`);
  await prisma.$executeRawUnsafe(`CREATE SCHEMA public;`);

  // Apply migrations to test database with explicit environment variable
  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: "postgresql://me:cascava1@localhost:5435/portfolio_test",
    },
  });

  // Create test user
  await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "USER",
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  (console.error as jest.Mock).mockRestore();
});
