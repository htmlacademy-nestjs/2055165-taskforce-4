import * as crypto from 'node:crypto';

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserRepository, UserEntity } from '@project/database-service';
import { User } from '@project/shared/app-types';
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

  public async register(data: CreateUserDTO): Promise<User> {
    const {password, ...profileData} = data;

    const existUser = await this.userRepository.findByEmail(profileData.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const newUser = await new UserEntity(profileData).setPassword(password);

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
