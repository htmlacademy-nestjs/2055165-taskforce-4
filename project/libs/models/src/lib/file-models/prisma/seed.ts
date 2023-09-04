import { PrismaClient } from '../../../../../../node_modules/@internal/prisma/file-schema'


const prisma = new PrismaClient();

async function fillDB() {
  await prisma.fileData.create({
    data:
      {
        originalName: 'test',
        size: 2,
        mimetype: 'test',
        hashName: 'test',
        path: 'test',
      },

  })
  console.info('🤘️ Mongo Database was filled')
}

fillDB()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
