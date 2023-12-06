import { Controller, Get, Query } from '@nestjs/common';
import { UserIndexQueryRequest } from './user-index-query.request';
import { UserQueryUsecase } from './user-query.usecase';

@Controller('users')
export class UserQueryController {
  constructor(private readonly userQueryUsecase: UserQueryUsecase) {}

  @Get('native')
  async native(@Query() request: UserIndexQueryRequest) {
    return await this.userQueryUsecase.index(request);
  }

  @Get('split')
  async split(@Query() request: UserIndexQueryRequest) {
    return await this.userQueryUsecase.index(request, true);
  }
}
