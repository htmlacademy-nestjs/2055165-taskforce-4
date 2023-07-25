import { Expose } from 'class-transformer';

export default class AuthUserRDO {
  @Expose()
  public id!: number;

  @Expose()
  public email!: string;

  @Expose()
  public accessToken!: string;
}
