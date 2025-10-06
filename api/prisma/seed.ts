import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "admin123", // in real life, hash this!
    },
  });

  // Create sample project
  await prisma.project.create({
    data: {
      title: "My Portfolio",
      description: "A fullstack personal portfolio",
      stack: ["Next.js", "Node", "Postgres"],
      userId: 1, // admin user
    },
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
