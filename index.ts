import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(allUsers, { depth: null });
}
main()
  .catch(async (e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
