import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { beforeAll, afterAll, jest } from "@jest/globals";
import bcrypt from "bcryptjs";

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

  // inside beforeAll, after migrations:
  const plain = "password123";
  const passwordHash = await bcrypt.hash(plain, 10);

  // Create test user
  await prisma.user.create({
    data: {
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
