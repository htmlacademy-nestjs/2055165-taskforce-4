import { compare, genSalt, hash } from 'bcrypt';

import { UserRole, City, User } from '@project/shared/app-types';

const SALT_ROUNDS = 10;

export class UserEntity implements User {
  id!: number;
  name!: string;
  email!: string;
  aboutInfo?: string;
  avatar?: string;
  hashPassword!: string;
  birthDate!: Date;
  city!: City;
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;


  constructor (user: User) {
    this.fillEntity(user);
  }

  public fillEntity(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.aboutInfo = user.aboutInfo;
    this.avatar = user.avatar;
    this.hashPassword = user.hashPassword;
    this.birthDate = user.birthDate;
    this.city = user.city;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      aboutInfo: this.aboutInfo,
      avatar: this.avatar,
      hashPassword: this.hashPassword,
      birthDate: this.birthDate,
      city: this.city,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.hashPassword = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.hashPassword);
  }
}
