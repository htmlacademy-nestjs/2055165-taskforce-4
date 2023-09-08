import { Injectable } from '@nestjs/common';

import { Token } from '@project/shared/app-types';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { DatabaseService } from '../prisma/database.service';

@Injectable()
export class RefreshTokenRepository {
  private prisma;
  constructor (private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaBaseMongoConnector;
  }

  public async create(item: RefreshTokenEntity): Promise<Token> {
    const tokenData = item.toObject();
    return this.prisma.refreshSession.create({data: tokenData});
  }

  public async deleteByTokenId(tokenId: string) {
    return this.prisma.refreshSession.delete({
      where: {tokenId}
    });
  }

  public async findByTokenId(tokenId: string): Promise<Token | null> {
    return this.prisma.refreshSession.findUnique({
      where: {tokenId}
    });
  }

  public async deleteExpiredTokens() {
    return this.prisma.refreshSession.deleteMany({
      where: {
        expiresIn: { lt: new Date() }
      }
    })
  }
}
