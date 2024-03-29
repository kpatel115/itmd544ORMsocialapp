import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearData() {
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
}

async function seedData() {
  try {
    console.log('Start seeding...');

    // Create users
    const alice = await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@example.com',
      },
    });
    const bob = await prisma.user.create({
      data: {
        name: 'Bob',
        email: 'bob@example.com',
      },
    });

    // Create a post
    const post = await prisma.post.create({
      data: {
        title: 'My first post',
        content: 'Content of the first post',
        published: true,
        author_id: alice.user_id, // Ensure this matches the field in your schema
      },
    });

    // Create a comment related to the post
    const comment = await prisma.comment.create({
      data: {
        title: 'First comment',
        content: 'Comment on the first post',
        published: true,
        commenter_id: bob.user_id, // Ensure this matches the field in your schema
        commented_post_id: post.post_id, // Ensure this matches the field in your schema
      },
    });

    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearData()
seedData();

