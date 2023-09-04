import dayjs from 'dayjs';
import { getRandomArrItem } from '@project/util/util-core';

import { PrismaClient as PostgresClient } from '.prisma/postgres-schema'
import { PrismaClient as MongoClient } from '.prisma/mongo-schema'

async function fillUsers(mongoConnector: MongoClient) {
  await mongoConnector.user.createMany({
    data: [
      {
        name: 'Employer1',
        email: 'Employer1@employers.local',
        birthDate: dayjs("2000-04-12").toDate(),
        city: 'Moscow',
        role: 'Employer',
        hashPassword: 'hashpassword'
      },
      {
        name: 'Employer2',
        email: 'Employer2@employers.local',
        birthDate: dayjs("1991-01-01").toDate(),
        city: 'SaintPetersburg',
        role: 'Employer',
        hashPassword: 'hashpassword'
      },
      {
        name: 'Employer3',
        email: 'Employer3@employers.local',
        birthDate: dayjs("2002-06-04").toDate(),
        city: 'Vladivostok',
        role: 'Employer',
        hashPassword: 'hashpassword'
      },
      {
        name: 'Executor1',
        email: 'Executor1@executors.local',
        birthDate: dayjs("1991-05-14").toDate(),
        city: 'Moscow',
        role: 'Executor',
        hashPassword: 'hashpassword'
      },
      {
        name: 'Executor2',
        email: 'Executor2@executors.local',
        birthDate: dayjs("1993-01-13").toDate(),
        city: 'SaintPetersburg',
        role: 'Executor',
        hashPassword: 'hashpassword'
      },
      {
        name: 'Executor3',
        email: 'Executor3@executors.local',
        birthDate: dayjs("2001-10-05").toDate(),
        city: 'Vladivostok',
        role: 'Executor',
        hashPassword: 'hashpassword'
      }
    ]
  })
}

async function fillTasksAndCategories(mongoConnector: MongoClient, psqlConnector: PostgresClient) {
  const employers = await mongoConnector.user.findMany({
    where: {
      role: 'Employer'
    },
    select: {
      id: true
    }
  });

  const employerIds = employers.map(({id}) => id);

  await psqlConnector.category.upsert({
    where: {categoryId: 1},
    update: {},
    create: {
      title: 'Первая категория',
      tasks: {
        createMany: {
          data: [
            {
              title: 'Название таска 1',
              description: 'Описание',
              price: 1000,
              city: 'Moscow',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: getRandomArrItem(employerIds),
            },
            {
              title: 'Название таска 2',
              description: 'Описание',
              price: 100,
              city: 'SaintPetersburg',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: getRandomArrItem(employerIds),
            }
          ]
        }
      }
    }
  })

  await psqlConnector.category.upsert({
    where: {categoryId: 2},
    update: {},
    create: {
      title: 'Вторая категория',
      tasks: {
        createMany: {
          data: [
            {
              title: 'Название таска 3',
              description: 'Описание',
              price: 1000,
              city: 'Vladivostok',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: getRandomArrItem(employerIds),
            },
            {
              title: 'Название таска 4',
              description: 'Описание',
              price: 10000,
              city: 'SaintPetersburg',
              status: 'New',
              commentsCount: 0,
              repliesCount: 0,
              employerId: getRandomArrItem(employerIds),
            }
          ]
        }
      }
    }
  })
}

export async function fillDB(mongoConnector: MongoClient, psqlConnector: PostgresClient) {
  await fillUsers(mongoConnector)
    .then(async () => {
      await mongoConnector.$disconnect()
      console.info('🤘️ User Database was filled.');
    })
    .catch(async (err) => {
      console.error(err);
      await mongoConnector.$disconnect();
    });


  await fillTasksAndCategories(mongoConnector, psqlConnector)
    .then(async () => {
      await psqlConnector.$disconnect()
      console.info('🤘️ Tasks Database was filled successfully.');
    })
    .catch(async (err) => {
      console.error(err);
      await psqlConnector.$disconnect();
    });
}



