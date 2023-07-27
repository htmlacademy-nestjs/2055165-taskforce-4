import dayjs from 'dayjs';
import * as nanoid from 'nanoid';

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserMemoryRepository, UserEntity } from '@project/database-service';
import CreateUserDTO from './dto/create-user.dto';
import { User, UserRole } from '@project/shared/app-types';
import AuthUserDTO from './dto/auth-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constants';

const userIdGenerator = nanoid.customAlphabet('1234567890', 10);


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserMemoryRepository
  ) {}


  private generateEmployerAdditionalFields = (user: UserEntity) => Object.assign(user, {
    publishedTasksCount: 0,
    newTasksCount: 0
  });


  private generateExecutorAdditionalFields = (user: UserEntity) => Object.assign(user, {
    specialization: [],
    completedTasksCount: 0,
    failedTasksCount: 0,
    rating: 0,
    ratingPosition: 0
  });


  private readonly additionalFields = {
    [UserRole.Employer]: this.generateEmployerAdditionalFields,
    [UserRole.Executor]: this.generateExecutorAdditionalFields
  }


  public async register(dto: CreateUserDTO): Promise<User> {
    const {name, email, password, avatar, birthDate, role, city} = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const newUser = {
      id: Number.parseInt(userIdGenerator(), 10),
      name,
      email,
      avatar,
      role,
      city,
      birthDate: dayjs(birthDate).toDate(),
      createdAt: new Date(),
      updatedAt: new Date(),
      hashPassword: ''
    };

    const userEntity = await new UserEntity(newUser).setPassword(password);

    return this.userRepository.create(this.additionalFields[userEntity.role](userEntity));
  }


  public async authorize(dto: AuthUserDTO) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }
}
