import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserData, User } from '@project/shared/app-types';

@Injectable()
export class UserMemoryRepository implements CRUDRepository<UserEntity, UpdateUserData, User> {
  private repository: Record<string, User> = {};


  public async create(item: UserEntity) {
    const entry = item.toObject();
    this.repository[item.id] = entry;

    return entry;
  }


  public async findById(userId: string) {
    if (! this.repository[userId]) {
      return null
    }

    return {...this.repository[userId]};
  }


  public async findByEmail(email: string) {
    const existUser = Object.values(this.repository).find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return {...existUser};
  }


  public async delete(id: number) {
    delete this.repository[id];
  }


  public async update(userId: number, item: UpdateUserData) {
    this.repository[userId] = {...this.repository[userId], ...item};
    return {...this.repository[userId]};
  }
}
