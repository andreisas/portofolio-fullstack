import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  const adminPasswordHash = await bcrypt.hash("adminpass", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  // Create 20 users
  const users = [];
  for (let i = 1; i <= 20; i++) {
    const passwordHash = await bcrypt.hash(`password${i}`, 10);
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        passwordHash,
      },
    });
    users.push(user);
  }

  // Create 10 projects
  for (let i = 1; i <= 10; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await prisma.project.create({
      data: {
        title: `Project ${i}`,
        description: `Description for project ${i}`,
        stack: ["React", "Node.js", "PostgreSQL"],
        userId: randomUser.id,
      },
    });
  }

  console.log("Database seeded with admin + 20 users and 10 projects!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
