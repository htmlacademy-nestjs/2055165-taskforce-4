import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    const authBaseUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.auth');
    const request = context.switchToHttp().getRequest();

    const { data } = await this.httpService.axiosRef.get(`${authBaseUrl}`, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    request['user'] = data;
    return true;
  }
}
