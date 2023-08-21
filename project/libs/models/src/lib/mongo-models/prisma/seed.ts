import { PrismaClient } from '../../../../../../node_modules/@internal/prisma/mongo-schema'


const prisma = new PrismaClient();

async function fillDB() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Odin',
        email: 'Odin@gods.local',
        birthDate: new Date(),
        city: 'Moscow',
        role: 'Employer',
        hashPassword: '3232iojd32ioj'
      },
      {
        name: 'Thor',
        email: 'Thor@gods.local',
        birthDate: new Date(),
        city: 'SaintPetersburg',
        role: 'Executor',
        hashPassword: '3ijij43oifj34oi'
      }
    ]
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
