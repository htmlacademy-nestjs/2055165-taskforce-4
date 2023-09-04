import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository, EmployerEntity, ExecutorEntity, UserEntity } from '@project/database-service';
import { TokenPayload, User, UserRole } from '@project/shared/app-types';
import AuthUserDTO from './dto/auth-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constants';
import CreateUserDTO from './dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
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

    const newData: Omit<User, 'id'> = {...profileData, hashPassword: ''};
    const newUser = await this.additionalFields[newData.role](newData).setPassword(password);

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


  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
