import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { beforeAll, afterAll, jest } from "@jest/globals";
import bcrypt from "bcryptjs";

// Note: Environment variables are loaded by jest.env.ts before this runs
const prisma = new PrismaClient();

beforeAll(async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  // Reset the database before running tests (use IF EXISTS to avoid race conditions)
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS public CASCADE;`);
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS public;`);

  // Apply migrations to test database with explicit environment variable
  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: "postgresql://me:cascava1@localhost:5435/portfolio_test",
    },
  });

  // inside beforeAll, after migrations:
  const plain = "password123";
  const passwordHash = await bcrypt.hash(plain, 10);

  // Create (or update) test user - use upsert to avoid unique constraint races
  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: { passwordHash },
    create: {
      name: "Test User",
      email: "test@example.com",
      passwordHash,
    },
  });

  // Create an admin user for tests (use upsert in case migrations/seed already created it)
  const adminPlain = "adminpass";
  const adminHash = await bcrypt.hash(adminPlain, 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { passwordHash: adminHash, role: "ADMIN" },
    create: {
      name: "Admin",
      email: "admin@example.com",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  (console.error as jest.Mock).mockRestore();
});
