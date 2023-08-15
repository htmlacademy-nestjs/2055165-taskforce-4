import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserData, User } from '@project/shared/app-types';

import { PrismaMongoService } from '../prisma/prisma-mongo.service'

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, UpdateUserData, User> {
  constructor(private readonly prisma: PrismaMongoService) {}


  public async create(item: UserEntity): Promise<User> {
    const data = item.toObject();
    return this.prisma.user.create({data})
  }


  public async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {email}
    })
  }


  public async findById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {id:userId}
    })
  }


  public async update(userId: string, item: UpdateUserData): Promise<User> {
    return this.prisma.user.update({
      where: {id: userId},
      data: item
    })
  }


  public async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: {id: userId}
    });
  }


}
