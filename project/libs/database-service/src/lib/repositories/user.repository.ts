import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserData, User } from '@project/shared/app-types';
import { DatabaseService } from '../prisma/database.service';

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, UpdateUserData, User> {
  private prisma;

  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaBaseMongoConnector;
  }


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


  public async update(userId: string, item: Omit<UpdateUserData, 'password, newPassword'>): Promise<User> {
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
