import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService }  from "@nestjs/jwt"
import { DatabaseService } from "../prisma/database.service";
import { TokenPayload } from "@project/shared/app-types";

@Injectable()
export class ModifyGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){}

  async canActivate(context: ExecutionContext) {
    const switched = context.switchToHttp();
    const req = switched.getRequest<Request>();
    const token = req.headers.authorization?.replace('Bearer', '').trim();
    if (token) {
      const payload: TokenPayload  = this.jwtService.decode(token) as TokenPayload;
      const {id} = payload;

      const user = await this.dbService.prismaBaseMongoConnector.user.findUnique({ where: {id} });
      await this.dbService.prismaBaseMongoConnector.$disconnect();
      console.log(user);

    }
    return true;
  }

}
