import * as crypto from 'node:crypto';

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserRepository, EmployerEntity, ExecutorEntity, UserEntity } from '@project/database-service';
import { User, UserRole } from '@project/shared/app-types';
import AuthUserDTO from './dto/auth-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constants';
import CreateUserDTO from './dto/create-user.dto';
import { getJwtAccessOptions, getJwtRefreshOptions } from '@project/config-service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}


  private generateEmployerAdditionalFields = (user: Omit<User, 'id'>): EmployerEntity =>
    new EmployerEntity(Object.assign(user, {
      publishedTasksCount: 0,
      newTasksCount: 0
    })
  );


  private generateExecutorAdditionalFields = (user: Omit<User, 'id'>): ExecutorEntity =>
    new ExecutorEntity(Object.assign(user, {
      specialization: [],
      completedTasksCount: 0,
      failedTasksCount: 0,
      rating: 0,
      ratingPosition: 0
    })
  );


  private readonly additionalFields = {
    [UserRole.Employer]: this.generateEmployerAdditionalFields,
    [UserRole.Executor]: this.generateExecutorAdditionalFields
  }


  public async register(data: CreateUserDTO): Promise<User> {
    const {password, ...profileData} = data;

    const existUser = await this.userRepository.findByEmail(profileData.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const newUser = await this.additionalFields[profileData.role](profileData).setPassword(password);

    return this.userRepository.create(newUser);
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

    return existUser;
  }


  public createUserToken = async ({id, name, email, role}: User) => {

    const tokenId = crypto.randomUUID();
    await this.refreshTokenService.createRefreshSession({sub: id, tokenId})

    return {
      accessToken: await this.jwtService.signAsync({ sub: id, name, email, role }, await getJwtAccessOptions(this.configService)),
      refreshToken: await this.jwtService.signAsync({ sub: id, tokenId }, await getJwtRefreshOptions(this.configService))
    }
  }
}
