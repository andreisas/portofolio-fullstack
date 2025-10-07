import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create 20 users
  const users = [];
  for (let i = 1; i <= 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: `password${i}`, // in real life, hash this!
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

  console.log("Database seeded with 20 users and 10 projects!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
