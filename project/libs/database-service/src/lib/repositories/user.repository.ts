import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserData, User } from '@project/shared/app-types';

import { PrismaMongoService } from '../prisma/prisma-mongo.service'

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, UpdateUserData, User> {
  constructor(private readonly prisma: PrismaMongoService) {}

  public async create(item: UserEntity): Promise<User | null> {
    const data = item.toObject();
    const user = await this.prisma.user.create({data})
    console.log(user);
    return null;
  }


  findById(id: string | number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  update(id: string | number, item: UpdateUserData): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Promise<void> {
    throw new Error('Method not implemented.');
  }


}
