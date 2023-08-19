import { PrismaClient } from '../../../../../../node_modules/@internal/prisma/postgres-schema'

const prisma = new PrismaClient();

async function fillDB() {
  await prisma.category.upsert({
    where: {categoryId: 1},
    update: {},
    create: {
      title: 'Уборка',
      tasks: {
        createMany: {
          data: [
            {
              title: 'Убрать кухню',
              description: 'Дочиста',
              price: 1000,
              city: 'Moscow',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: '1',
            },
            {
              title: 'Убрать гостиную',
              description: 'по-бырому',
              price: 100,
              city: 'SaintPetersburg',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: '2',
            }
          ]
        }
      }
    }
  })

  await prisma.category.upsert({
    where: {categoryId: 2},
    update: {},
    create: {
      title: 'Готовка',
      tasks: {
        createMany: {
          data: [
            {
              title: 'Сварить борщ',
              description: 'на всю семью',
              price: 1000,
              city: 'Vladivostok',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: '1',
            },
            {
              title: 'Сделать котлетки',
              description: 'с пюрешкой не с макарошками',
              price: 10000,
              city: 'SaintPetersburg',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: '2',
            }
          ]
        }
      }
    }
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
