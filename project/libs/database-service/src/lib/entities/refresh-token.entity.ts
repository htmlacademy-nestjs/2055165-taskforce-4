import { Token } from '@project/shared/app-types';

export class RefreshTokenEntity implements Omit<Token, 'id'> {
  public userId!: string;
  public tokenId!: string;
  public expiresIn!: Date;


  constructor(refreshToken: Omit<Token, 'id'>) {
    this.fillEntity(refreshToken);
  }

  public fillEntity(refreshToken: Omit<Token, 'id'>): void {
    this.userId = refreshToken.userId;
    this.tokenId = refreshToken.tokenId;
    this.expiresIn = refreshToken.expiresIn;
  }

  public toObject() {
    return {
      userId: this.userId,
      tokenId: this.tokenId,
      expiresIn: this.expiresIn
    }
  }

}
