import { Body, Controller, Get, Param, Post, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { CheckAuthGuard } from "../../shared/guards/check-auth-guard";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { AxiosExceptionFilter } from "../../shared/filters/axios-exception.filter";
import { UserIdAndRoleInterceptor } from "../../shared/interceptors/user-id-role.interceptor";

@Controller('categories')
@UseFilters(AxiosExceptionFilter)
@UseGuards(CheckAuthGuard)
export class CategoryController {
  private baseCategoriesUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseCategoriesUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.categories');
  }

  @Post('/create')
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async createOrGetExist(@Body() dto: CreateCategoryDTO) {
    const {data: category} = await this.httpService.axiosRef.post(`${this.baseCategoriesUrl}/create`, dto)
    return category
  }


  @Get('/:id')
  public async getCategory(@Param('id') categoryId: number) {
    const {data: category} = await this.httpService.axiosRef.get(`${this.baseCategoriesUrl}/${categoryId}`)
    return category
  }
}
