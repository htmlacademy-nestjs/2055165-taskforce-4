import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { UserEntity } from '@project/shared/entities';
import { User } from '@project/shared/app-types';

@Injectable()
export class UserMemoryRepository implements CRUDRepository<UserEntity, User> {
  private repository: Record<number, User> = {};


  public async create(item: UserEntity): Promise<User> {
    const entry = item.toObject();
    this.repository[item.id] = entry;

    return entry;
  }


  public async findById(id: number): Promise<User | null> {
    if (! this.repository[id]) {
      return null
    }

    return {...this.repository[id]};
  }


  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository).find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return {...existUser};
  }


  public async delete(id: number): Promise<void> {
    delete this.repository[id];
  }


  public async update(id: number, item: UserEntity): Promise<User> {
    this.repository[id] = {...this.repository[id], ...item.toObject()};
    return {...this.repository[id]};
  }
}
