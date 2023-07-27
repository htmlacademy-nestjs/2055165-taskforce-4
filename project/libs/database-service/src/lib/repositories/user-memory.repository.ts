import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { UserEntity } from '../entities/user.entity';
import { Executor, User, UserType } from '@project/shared/app-types';

@Injectable()
export class UserMemoryRepository implements CRUDRepository<UserEntity, User> {
  private repository: Record<number, UserType<Executor>> = {};


  public async create(item: UserEntity): Promise<User> {
    const entry = item.toObject();
    // this.repository[item.id] = entry;

    return entry;
  }


  public async findById(id: number): Promise<User | Executor | null> {
    if (! this.repository[id]) {
      return null
    }

    return {...this.repository[id]};
  }


  public async findByEmail(email: string): Promise<User | Executor | null> {
    const existUser = Object.values(this.repository).find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return {...existUser};
  }


  public async delete(id: number): Promise<void> {
    delete this.repository[id];
  }


  public async update(userId: number, item: Partial<Omit<UserEntity, 'id'>>): Promise<User> {
    this.repository[userId] = {...this.repository[userId], ...item};
    return {...this.repository[userId]};
  }
}
