import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.update({
    where: {
      slug: "my-first-post",
    },
    data: {
      comments: {
        createMany: {
          data: [
            { comment: "Great post!" },
            { comment: "Can't wait to read more!" },
          ],
        },
      },
    },
  });
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });

  console.dir(posts, { depth: Infinity });
}
main()
  .catch(async (e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
